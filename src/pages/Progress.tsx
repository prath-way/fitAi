
import { AppLayout } from '@/components/AppLayout';
import { GlassCard } from '@/components/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Target, Activity, Flame } from 'lucide-react';

const Progress = () => {
  const weightData = [
    { date: 'Jan', weight: 180 },
    { date: 'Feb', weight: 178 },
    { date: 'Mar', weight: 175 },
    { date: 'Apr', weight: 173 },
    { date: 'May', weight: 170 },
    { date: 'Jun', weight: 168 }
  ];

  const workoutData = [
    { week: 'Week 1', workouts: 3 },
    { week: 'Week 2', workouts: 4 },
    { week: 'Week 3', workouts: 5 },
    { week: 'Week 4', workouts: 4 }
  ];

  const chartConfig = {
    weight: {
      label: "Weight (lbs)",
      color: "hsl(var(--primary))",
    },
    workouts: {
      label: "Workouts",
      color: "hsl(var(--primary))",
    },
  };

  const stats = [
    {
      title: "Weight Lost",
      value: "12 lbs",
      icon: TrendingUp,
      change: "+2.4%",
      positive: true
    },
    {
      title: "Workouts Completed",
      value: "48",
      icon: Activity,
      change: "+12%",
      positive: true
    },
    {
      title: "Calories Burned",
      value: "15,240",
      icon: Flame,
      change: "+8.2%",
      positive: true
    },
    {
      title: "Goal Progress",
      value: "67%",
      icon: Target,
      change: "+15%",
      positive: true
    }
  ];

  // Nutrition mock data
  const caloriesData = [
    { date: 'Mon', calories: 1800 },
    { date: 'Tue', calories: 1950 },
    { date: 'Wed', calories: 2100 },
    { date: 'Thu', calories: 2000 },
    { date: 'Fri', calories: 2200 },
    { date: 'Sat', calories: 2300 },
    { date: 'Sun', calories: 1900 },
  ];
  const macrosData = [
    { name: 'Protein', value: 120 },
    { name: 'Carbs', value: 260 },
    { name: 'Fat', value: 70 },
  ];
  const macrosColors = ['#3b82f6', '#22d3ee', '#f59e42'];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron gradient-text mb-4">
            Your Progress
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your fitness journey and celebrate achievements
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
                  <p className={`text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </GlassCard>
          ))}
        </div>

        <Tabs defaultValue="weight" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="weight">
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-6">Weight Progress</h3>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="var(--color-weight)" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </GlassCard>
          </TabsContent>

          <TabsContent value="workouts">
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-6">Weekly Workouts</h3>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="workouts" fill="var(--color-workouts)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </GlassCard>
          </TabsContent>

          <TabsContent value="nutrition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold mb-6">Calories Over Time</h3>
                <ChartContainer config={{ calories: { label: 'Calories', color: 'hsl(var(--primary))' } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={caloriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="calories" stroke="var(--color-calories, #3b82f6)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="text-xl font-semibold mb-6">Macros Breakdown</h3>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={macrosData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {macrosData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={macrosColors[idx % macrosColors.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Progress;
