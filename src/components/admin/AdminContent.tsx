'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAdminData, createModule, updateModule, deleteModule, createProblem, updateProblem, deleteProblem } from '@/app/admin/actions'
import { FileCode, Activity, Plus, Trash2, Edit, Check, Eye, EyeOff } from 'lucide-react'

export function AdminContent() {
    const [data, setData] = useState<any>({ modules: [], problems: [] })
    const [loading, setLoading] = useState(true)

    const [editModuleId, setEditModuleId] = useState<string | null>(null)
    const [moduleTitle, setModuleTitle] = useState('')
    const [moduleSlug, setModuleSlug] = useState('')
    const [moduleDesc, setModuleDesc] = useState('')

    const [editProblemId, setEditProblemId] = useState<string | null>(null)
    const [probTitle, setProbTitle] = useState('')
    const [probSlug, setProbSlug] = useState('')
    const [probModuleId, setProbModuleId] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        setLoading(true)
        try {
            const res = await getAdminData()
            setData(res)
        } catch (e) { console.error(e) }
        setLoading(false)
    }

    async function handleTogglePublish(m: any) {
        await updateModule(m.id, { published: !m.published })
        loadData()
    }

    async function handleDeleteModule(id: string) {
        if (!confirm('Delete module?')) return
        await deleteModule(id)
        loadData()
    }

    async function handleSaveModule() {
        if (editModuleId) {
            await updateModule(editModuleId, { title: moduleTitle, slug: moduleSlug, description: moduleDesc })
        } else {
            await createModule({
                title: moduleTitle,
                slug: moduleSlug || `mod-${Date.now()}`,
                description: moduleDesc || 'Description',
                order: data.modules.length
            })
        }
        setEditModuleId(null)
        setModuleTitle(''); setModuleSlug(''); setModuleDesc('')
        loadData()
    }

    async function handleDeleteProblem(id: string) {
        if (!confirm('Delete problem?')) return
        await deleteProblem(id)
        loadData()
    }

    async function handleSaveProblem() {
        if (editProblemId) {
            await updateProblem(editProblemId, { title: probTitle, slug: probSlug, moduleId: probModuleId })
        } else {
            if (!probModuleId) return alert('Select a module')
            await createProblem({
                title: probTitle,
                slug: probSlug || `prob-${Date.now()}`,
                moduleId: probModuleId,
                difficulty: 'EASY',
                description: 'Problem description',
                constraints: 'Constraints',
                examples: '[]',
                intuition: 'Intuition',
                thinkSection: '[]',
                bruteForce: 'Brute force logic',
                optimization: 'Optimization logic',
                solution: '[]',
                timeComplexity: 'O(1)',
                spaceComplexity: 'O(1)',
                starterCode: '{}',
                testCases: '[]',
                hints: '[]',
                order: data.problems.length
            })
        }
        setEditProblemId(null)
        setProbTitle(''); setProbSlug(''); setProbModuleId('')
        loadData()
    }

    if (loading) return <div className="p-4 text-center">Loading Content...</div>

    return (
        <div className="space-y-8">
            {/* Module Management */}
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Modules</CardTitle>
                        <CardDescription>Manage curriculum modules & publish status</CardDescription>
                    </div>
                    <Button onClick={() => { setEditModuleId(''); setModuleTitle(''); setModuleSlug(''); setModuleDesc('') }} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Module
                    </Button>
                </CardHeader>
                <CardContent>
                    {editModuleId !== null && (
                        <div className="p-4 bg-muted/30 rounded-lg mb-4 grid gap-4 grid-cols-1 md:grid-cols-4 items-end">
                            <div>
                                <label className="text-xs font-medium">Title</label>
                                <Input value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="Module Title" />
                            </div>
                            <div>
                                <label className="text-xs font-medium">Slug</label>
                                <Input value={moduleSlug} onChange={e => setModuleSlug(e.target.value)} placeholder="slug-name" />
                            </div>
                            <div>
                                <label className="text-xs font-medium">Description</label>
                                <Input value={moduleDesc} onChange={e => setModuleDesc(e.target.value)} placeholder="Short desc" />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSaveModule}>Save</Button>
                                <Button variant="ghost" onClick={() => setEditModuleId(null)}>Cancel</Button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {data.modules.map((m: any) => (
                            <div key={m.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:border-primary/30 transition-colors">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{m.title}</span>
                                        <Badge variant={m.published ? 'default' : 'secondary'}>
                                            {m.published ? 'Published' : 'Draft'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">({m.problems?.length || 0} problems)</p>
                                </div>
                                <div className="flex gap-2 mt-4 md:mt-0">
                                    <Button variant="outline" size="sm" onClick={() => handleTogglePublish(m)}>
                                        {m.published ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                                        {m.published ? 'Unpublish' : 'Publish'}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => {
                                        setEditModuleId(m.id); setModuleTitle(m.title); setModuleSlug(m.slug); setModuleDesc(m.description);
                                    }}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteModule(m.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Problem Management */}
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Problems</CardTitle>
                        <CardDescription>Add, edit or assign problems to modules</CardDescription>
                    </div>
                    <Button onClick={() => { setEditProblemId(''); setProbTitle(''); setProbSlug(''); setProbModuleId('') }} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Problem
                    </Button>
                </CardHeader>
                <CardContent>
                    {editProblemId !== null && (
                        <div className="p-4 bg-muted/30 rounded-lg mb-4 grid gap-4 grid-cols-1 md:grid-cols-4 items-end">
                            <div>
                                <label className="text-xs font-medium">Title</label>
                                <Input value={probTitle} onChange={e => setProbTitle(e.target.value)} placeholder="Problem Title" />
                            </div>
                            <div>
                                <label className="text-xs font-medium">Slug</label>
                                <Input value={probSlug} onChange={e => setProbSlug(e.target.value)} placeholder="slug-name" />
                            </div>
                            <div>
                                <label className="text-xs font-medium">Assign Module</label>
                                <div className="w-full">
                                    <select
                                        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        value={probModuleId}
                                        onChange={e => setProbModuleId(e.target.value)}
                                    >
                                        <option value="">-- Select Module --</option>
                                        {data.modules.map((m: any) => (
                                            <option key={m.id} value={m.id}>{m.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSaveProblem}>Save</Button>
                                <Button variant="ghost" onClick={() => setEditProblemId(null)}>Cancel</Button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {data.problems.map((p: any) => {
                            const assignedMod = data.modules.find((m: any) => m.id === p.moduleId)
                            return (
                                <div key={p.id} className="flex items-center justify-between p-3 border rounded hover:bg-muted/10">
                                    <div>
                                        <span className="font-medium inline-block w-48 truncate">{p.title}</span>
                                        <Badge variant="outline" className="ml-2">Mod: {assignedMod?.title || 'Unknown'}</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => {
                                            setEditProblemId(p.id); setProbTitle(p.title); setProbSlug(p.slug); setProbModuleId(p.moduleId);
                                        }}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteProblem(p.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
