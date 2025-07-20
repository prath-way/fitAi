
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Utensils, Target, TrendingUp, Dumbbell, Apple } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [todayStats, setTodayStats] = useState({
    workoutCompleted: false,
    mealsLogged: 2,
    totalMeals: 3,
    waterIntake: 6,
    targetWater: 8,
    caloriesConsumed: 1450,
    targetCalories: 2000,
    stepsTaken: 7500,
    targetSteps: 10000,
  });

  const [todayWorkout, setTodayWorkout] = useState({
    name: "Upper Body Strength",
    duration: "45 minutes",
    exercises: ["Push-ups", "Pull-ups", "Bench Press", "Shoulder Press"],
    difficulty: "Intermediate"
  });

  const [todayMeals, setTodayMeals] = useState([
    { name: "Breakfast", calories: 450, completed: true, time: "8:00 AM" },
    { name: "Lunch", calories: 600, completed: true, time: "1:00 PM" },
    { name: "Dinner", calories: 550, completed: false, time: "7:00 PM" },
  ]);

  if (!user) return null;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron gradient-text mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="text-center">
            <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.stepsTaken.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Steps Today</div>
            <Progress value={(todayStats.stepsTaken / todayStats.targetSteps) * 100} className="mt-2" />
          </GlassCard>

          <GlassCard className="text-center">
            <Utensils className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.caloriesConsumed}</div>
            <div className="text-sm text-muted-foreground">Calories</div>
            <Progress value={(todayStats.caloriesConsumed / todayStats.targetCalories) * 100} className="mt-2" />
          </GlassCard>

          <GlassCard className="text-center">
            <Target className="h-8 w-8 text-neon-green mx-auto mb-2" />
            <div className="text-2xl font-bold">{todayStats.waterIntake}</div>
            <div className="text-sm text-muted-foreground">Glasses of Water</div>
            <Progress value={(todayStats.waterIntake / todayStats.targetWater) * 100} className="mt-2" />
          </GlassCard>

          <GlassCard className="text-center">
            <TrendingUp className="h-8 w-8 text-coral-pink mx-auto mb-2" />
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-muted-foreground">Goal Progress</div>
            <Progress value={85} className="mt-2" />
          </GlassCard>
        </div>

        {/* Today's Workout and Meals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Workout */}
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-primary" />
                Today's Workout
              </h2>
              <Badge variant={todayStats.workoutCompleted ? "default" : "secondary"}>
                {todayStats.workoutCompleted ? "Completed" : "Pending"}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">{todayWorkout.name}</h3>
                <p className="text-muted-foreground">{todayWorkout.duration} • {todayWorkout.difficulty}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Exercises:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {todayWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="text-sm bg-muted/50 rounded-lg p-2">
                      {exercise}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent"
                disabled={todayStats.workoutCompleted}
              >
                {todayStats.workoutCompleted ? "Workout Completed!" : "Start Workout"}
              </Button>
            </div>
          </GlassCard>

          {/* Today's Meals */}
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Apple className="h-6 w-6 text-accent" />
                Today's Meals
              </h2>
              <Badge variant="outline">
                {todayStats.mealsLogged}/{todayStats.totalMeals} logged
              </Badge>
            </div>
            
            <div className="space-y-4">
              {todayMeals.map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{meal.name}</div>
                    <div className="text-sm text-muted-foreground">{meal.time} • {meal.calories} cal</div>
                  </div>
                  <Badge variant={meal.completed ? "default" : "secondary"}>
                    {meal.completed ? "Logged" : "Pending"}
                  </Badge>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                View Full Meal Plan
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <GlassCard>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Activity className="h-6 w-6" />
              Log Activity
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Utensils className="h-6 w-6" />
              Log Meal
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <Target className="h-6 w-6" />
              Update Goals
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              View Progress
            </Button>
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
