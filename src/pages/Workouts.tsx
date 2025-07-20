
import { AppLayout } from '@/components/AppLayout';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, Flame, Target } from 'lucide-react';

const Workouts = () => {
  const workouts = [
    {
      id: 1,
      name: "Morning HIIT",
      duration: "25 mins",
      calories: 320,
      difficulty: "Intermediate",
      exercises: 8,
      completed: false
    },
    {
      id: 2,
      name: "Strength Training",
      duration: "45 mins",
      calories: 280,
      difficulty: "Advanced",
      exercises: 12,
      completed: true
    },
    {
      id: 3,
      name: "Yoga Flow",
      duration: "30 mins",
      calories: 150,
      difficulty: "Beginner",
      exercises: 10,
      completed: false
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron gradient-text mb-4">
            Your Workouts
          </h1>
          <p className="text-lg text-muted-foreground">
            Personalized workout routines designed just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <GlassCard key={workout.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{workout.name}</h3>
                <Badge 
                  variant={workout.difficulty === 'Beginner' ? 'secondary' : 
                          workout.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                >
                  {workout.difficulty}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{workout.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Flame className="h-4 w-4" />
                  <span>{workout.calories} calories</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>{workout.exercises} exercises</span>
                </div>
              </div>

              {workout.completed && (
                <Progress value={100} className="w-full" />
              )}

              <Button 
                className="w-full"
                variant={workout.completed ? "outline" : "default"}
              >
                <Play className="h-4 w-4 mr-2" />
                {workout.completed ? "View Workout" : "Start Workout"}
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Workouts;
