
import { AppLayout } from '@/components/AppLayout';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, Utensils, Settings, Eye, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      icon: Users,
      change: "+12.5%"
    },
    {
      title: "Active Workouts",
      value: "156",
      icon: Activity,
      change: "+8.2%"
    },
    {
      title: "Meal Plans",
      value: "89",
      icon: Utensils,
      change: "+15.3%"
    },
    {
      title: "System Health",
      value: "99.9%",
      icon: Settings,
      change: "+0.1%"
    }
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", joined: "2024-01-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Inactive", joined: "2024-01-10" }
  ];

  const workouts = [
    { id: 1, name: "HIIT Beginner", difficulty: "Beginner", users: 245, status: "Published" },
    { id: 2, name: "Strength Advanced", difficulty: "Advanced", users: 128, status: "Published" },
    { id: 3, name: "Yoga Flow", difficulty: "Intermediate", users: 189, status: "Draft" }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron gradient-text mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage users, content, and system analytics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-500">{stat.change} from last month</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </GlassCard>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="meals">Meals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">User Management</h3>
                <Button>Add User</Button>
              </div>
              
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">Joined: {user.joined}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="workouts">
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Workout Management</h3>
                <Button>Add Workout</Button>
              </div>
              
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {workout.difficulty} • {workout.users} users
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={workout.status === 'Published' ? 'default' : 'secondary'}>
                        {workout.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="meals">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Meal Plan Management</h3>
              <p className="text-muted-foreground">
                Meal plan management interface coming soon
              </p>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Detailed analytics and reporting dashboard coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
