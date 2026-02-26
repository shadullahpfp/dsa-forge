'use server'

import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ADMIN_EMAIL } from '@/lib/config'
import { revalidatePath } from 'next/cache'

async function isAdmin() {
    const session = await getServerSession(authOptions)
    return session?.user?.role === 'ADMIN' || session?.user?.email === ADMIN_EMAIL
}

export async function getAdminData() {
    if (!(await isAdmin())) throw new Error('Unauthorized')

    const modules = await db.module.findMany({
        include: { problems: true },
        orderBy: { order: 'asc' }
    })

    const problems = await db.problem.findMany({
        orderBy: { order: 'asc' }
    })

    return { modules, problems }
}

export async function createModule(data: any) {
    if (!(await isAdmin())) throw new Error('Unauthorized')
    const newModule = await db.module.create({ data })
    revalidatePath('/admin')
    revalidatePath('/')
    return newModule
}

export async function updateModule(id: string, data: any) {
    if (!(await isAdmin())) throw new Error('Unauthorized')
    const updatedModule = await db.module.update({ where: { id }, data })
    revalidatePath('/admin')
    revalidatePath('/')
    return updatedModule
}

export async function deleteModule(id: string) {
    if (!(await isAdmin())) throw new Error('Unauthorized')
    await db.module.delete({ where: { id } })
    revalidatePath('/admin')
    revalidatePath('/')
    return true
}

export async function createProblem(data: any) {
    if (!(await isAdmin())) throw new Error('Unauthorized')
    const problem = await db.problem.create({ data })
    revalidatePath('/admin')
    revalidatePath('/')
    return problem
}

export async function updateProblem(id: string, data: any) {
    if (!(await isAdmin())) throw new Error('Unauthorized')
    const problem = await db.problem.update({ where: { id }, data })
    revalidatePath('/admin')
    revalidatePath('/')
    return problem
}

export async function deleteProblem(id: string) {
    if (!(await isAdmin())) throw new Error('Unauthorized')
    await db.problem.delete({ where: { id } })
    revalidatePath('/admin')
    revalidatePath('/')
    return true
}
