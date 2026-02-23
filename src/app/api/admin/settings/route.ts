import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin, logAdminAction, checkRateLimit } from '@/lib/admin-middleware'
import { db } from '@/lib/db'

// GET - Get app settings
export async function GET(request: NextRequest) {
  const verification = await verifyAdmin(request)
  
  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error }, { status: 401 })
  }

  try {
    const settings = await db.appSettings.findMany()
    
    const settingsMap = settings.reduce((acc, s) => {
      acc[s.key] = s.value === 'true' ? true : s.value === 'false' ? false : s.value
      return acc
    }, {} as Record<string, unknown>)

    return NextResponse.json({
      maintenanceMode: settingsMap.maintenanceMode ?? false,
      allowSignups: settingsMap.allowSignups ?? true,
      allowGoogleOAuth: settingsMap.allowGoogleOAuth ?? true,
      allowEmailPassword: settingsMap.allowEmailPassword ?? true,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PATCH - Update app settings
export async function PATCH(request: NextRequest) {
  const verification = await verifyAdmin(request)
  
  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error }, { status: 401 })
  }

  const rateCheck = checkRateLimit(verification.userId!)
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { key, value } = body

    if (!key || typeof value === 'undefined') {
      return NextResponse.json({ error: 'Missing key or value' }, { status: 400 })
    }

    const validKeys = ['maintenanceMode', 'allowSignups', 'allowGoogleOAuth', 'allowEmailPassword']
    if (!validKeys.includes(key)) {
      return NextResponse.json({ error: 'Invalid setting key' }, { status: 400 })
    }

    // Upsert the setting
    const setting = await db.appSettings.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })

    await logAdminAction(verification.userId!, 'UPDATE_SETTING', 'APP_SETTINGS', null, {
      key,
      value,
    })

    return NextResponse.json({
      message: 'Setting updated successfully',
      setting,
    })
  } catch (error) {
    console.error('Error updating setting:', error)
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }
}
