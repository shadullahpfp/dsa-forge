'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useTheme } from 'next-themes'
import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Bell, Shield, Palette, Check, Loader2 } from 'lucide-react'
import { EDUCATION_SYMBOLS, PROGRAMMING_LANGUAGES, SUPPORT_EMAIL } from '@/lib/config'

const experienceLevels = [
  { value: 'BEGINNER', label: `Beginner ${EDUCATION_SYMBOLS.BEGINNER}`, description: 'New to programming or DSA' },
  { value: 'INTERMEDIATE', label: `Intermediate ${EDUCATION_SYMBOLS.INTERMEDIATE}`, description: 'Familiar with basic DSA concepts' },
  { value: 'ADVANCED', label: `Advanced ${EDUCATION_SYMBOLS.ADVANCED}`, description: 'Experienced with most DSA topics' },
]

export function ProfileSettings() {
  const { theme, setTheme } = useTheme()
  const { user, updateUser } = useAuthStore()
  const { setCurrentView } = useUIStore()
  const [name, setName] = useState(user?.name || '')
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'javascript')
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || 'BEGINNER')
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/user?userId=${user?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          name,
          preferredLanguage,
          experienceLevel,
        }),
      })

      if (response.ok) {
        updateUser({ name, preferredLanguage, experienceLevel })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getExperienceSymbol = (level: string) => {
    switch (level) {
      case 'BEGINNER': return EDUCATION_SYMBOLS.BEGINNER
      case 'INTERMEDIATE': return EDUCATION_SYMBOLS.INTERMEDIATE
      case 'ADVANCED': return EDUCATION_SYMBOLS.ADVANCED
      default: return EDUCATION_SYMBOLS.BEGINNER
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image || undefined} />
              <AvatarFallback className="text-xl">
                {user?.name?.[0]?.toUpperCase() || user?.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user?.name || 'User'}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                {(user?.role === 'ADMIN' || user?.email === 'acontrol030@gmail.com') ? (
                  <Badge variant="destructive" className="bg-destructive/10 text-destructive border-transparent hover:bg-destructive/20 gap-1 uppercase tracking-wider text-[10px]">
                    <Shield className="h-3 w-3" />
                    Admin
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">{user?.role || 'User'}</Badge>
                )}
                <Badge variant="outline">{user?.streak || 0} day streak</Badge>
                <Badge variant="outline">
                  {getExperienceSymbol(user?.experienceLevel || 'BEGINNER')} {user?.experienceLevel || 'BEGINNER'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Preferences
          </CardTitle>
          <CardDescription>Customize your learning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAMMING_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Default language for code solutions
              </p>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Theme and display settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                {['light', 'dark', 'system'].map((t) => (
                  <Button
                    key={t}
                    variant={theme === t ? 'default' : 'outline'}
                    className="capitalize"
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Support
          </CardTitle>
          <CardDescription>Get help with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              For assistance, contact our support team:
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm text-primary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : null}
          {saved ? 'Saved' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
