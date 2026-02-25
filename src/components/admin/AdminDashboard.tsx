'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  FileCode,
  Settings,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  Clock,
  BarChart3,
} from 'lucide-react'
import { ADMIN_EMAIL, SUPPORT_EMAIL } from '@/lib/config'
import { AdminContent } from './AdminContent'

interface UserStats {
  total: number
  active: number
  blocked: number
  newToday: number
}

interface ContentStats {
  modules: number
  problems: number
  submissions: number
}

export function AdminDashboard() {
  const { user } = useAuthStore()
  const [userStats, setUserStats] = useState<UserStats>({ total: 0, active: 0, blocked: 0, newToday: 0 })
  const [contentStats, setContentStats] = useState<ContentStats>({ modules: 0, problems: 0, submissions: 0 })
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  // Verify admin role
  const isAdmin = user?.role === 'ADMIN' || user?.email === ADMIN_EMAIL

  useEffect(() => {
    if (!isAdmin) return

    const loadAdminData = async () => {
      try {
        // In production, these would be real API calls
        // For now, we'll use mock data
        setUserStats({ total: 150, active: 89, blocked: 3, newToday: 12 })
        setContentStats({ modules: 13, problems: 156, submissions: 2340 })
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAdminData()
  }, [isAdmin])

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="border-red-500/50">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You do not have permission to access the admin dashboard.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Contact {SUPPORT_EMAIL} for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, content, and platform settings</p>
        </div>
        <Badge variant="destructive" className="gap-2 px-3 py-1">
          <Shield className="h-4 w-4" />
          ADMIN
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              +{userStats.newToday} new today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.active}</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Problems</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.problems}</div>
            <p className="text-xs text-muted-foreground">
              Across {contentStats.modules} modules
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.submissions}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <FileCode className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Button variant="outline">Filter</Button>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div>User</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Last Active</div>
                    <div>Actions</div>
                  </div>
                  {/* Mock user data */}
                  {[
                    { name: 'Demo User', email: 'demo@dsaforge.dev', role: 'USER', status: 'active' },
                    { name: 'Admin User', email: ADMIN_EMAIL, role: 'ADMIN', status: 'active' },
                    { name: 'Blocked User', email: 'blocked@example.com', role: 'USER', status: 'blocked' },
                  ].map((u, i) => (
                    <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                      </div>
                      <div>
                        <Badge variant={u.role === 'ADMIN' ? 'default' : 'outline'}>
                          {u.role}
                        </Badge>
                      </div>
                      <div>
                        <Badge variant={u.status === 'active' ? 'outline' : 'destructive'} className="gap-1">
                          {u.status === 'active' ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3" />
                              Blocked
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        2 hours ago
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3" />
                        </Button>
                        {u.email !== ADMIN_EMAIL && (
                          <Button size="sm" variant="outline">
                            {u.status === 'active' ? 'Block' : 'Unblock'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <AdminContent />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable access to the platform
                    </p>
                  </div>
                </div>
                <Button
                  variant={maintenanceMode ? 'destructive' : 'outline'}
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                >
                  {maintenanceMode ? 'Disable' : 'Enable'}
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-sm text-muted-foreground">
                  Support Email: {SUPPORT_EMAIL}
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Admin Information</h4>
                <p className="text-sm text-muted-foreground">
                  Admin Email: {ADMIN_EMAIL}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your Role: {user?.role}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
