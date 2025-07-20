
import { AppLayout } from '@/components/AppLayout';
import { GlassCard } from '@/components/GlassCard';
import { MealScanner } from '@/components/MealScanner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Coffee, Utensils, Plus, Camera } from 'lucide-react';

const Nutrition = () => {
  const dailyStats = {
    calories: { consumed: 1450, target: 2200 },
    protein: { consumed: 85, target: 150 },
    carbs: { consumed: 180, target: 250 },
    fat: { consumed: 45, target: 80 }
  };

  const meals = [
    {
      id: 1,
      name: "Breakfast",
      icon: Coffee,
      items: ["Oatmeal with berries", "Greek yogurt"],
      calories: 420,
      logged: true
    },
    {
      id: 2,
      name: "Lunch",
      icon: Utensils,
      items: ["Grilled chicken salad", "Quinoa"],
      calories: 580,
      logged: true
    },
    {
      id: 3,
      name: "Snack",
      icon: Apple,
      items: ["Apple", "Almonds"],
      calories: 200,
      logged: false
    },
    {
      id: 4,
      name: "Dinner",
      icon: Utensils,
      items: ["Salmon", "Sweet potato", "Broccoli"],
      calories: 650,
      logged: false
    }
  ];

  // Sample meal plan for a week
  const mealPlan = [
    { day: 'Monday', meals: ['Oatmeal & Berries', 'Grilled Chicken Salad', 'Salmon & Broccoli'] },
    { day: 'Tuesday', meals: ['Greek Yogurt & Fruit', 'Turkey Sandwich', 'Stir-fried Tofu & Veggies'] },
    { day: 'Wednesday', meals: ['Egg White Omelette', 'Quinoa Bowl', 'Chicken & Sweet Potato'] },
    { day: 'Thursday', meals: ['Smoothie Bowl', 'Lentil Soup', 'Shrimp & Brown Rice'] },
    { day: 'Friday', meals: ['Avocado Toast', 'Chicken Wrap', 'Beef & Veggie Stir-fry'] },
    { day: 'Saturday', meals: ['Protein Pancakes', 'Tuna Salad', 'Pasta & Meatballs'] },
    { day: 'Sunday', meals: ['Bagel & Cream Cheese', 'Veggie Burger', 'Grilled Fish & Asparagus'] },
  ];

  // Sample nutrition history
  const nutritionHistory = [
    { date: '2024-05-20', meal: 'Breakfast', calories: 420 },
    { date: '2024-05-20', meal: 'Lunch', calories: 580 },
    { date: '2024-05-20', meal: 'Dinner', calories: 650 },
    { date: '2024-05-19', meal: 'Breakfast', calories: 400 },
    { date: '2024-05-19', meal: 'Lunch', calories: 600 },
    { date: '2024-05-19', meal: 'Dinner', calories: 700 },
  ];

  const handleMealScanComplete = (nutritionData: any) => {
    console.log('Meal scanned:', nutritionData);
    // Here you would typically update the daily stats and add the meal to the log
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron gradient-text mb-4">
            Nutrition Tracker
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your meals and reach your nutrition goals
          </p>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="scanner">Meal Scanner</TabsTrigger>
            <TabsTrigger value="meals">Meal Plans</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Daily Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(dailyStats).map(([key, value]) => (
                <GlassCard key={key} className="p-4 text-center">
                  <h3 className="text-sm font-medium text-muted-foreground capitalize mb-2">
                    {key}
                  </h3>
                  <div className="text-2xl font-bold mb-2">
                    {value.consumed}
                    <span className="text-sm text-muted-foreground">/{value.target}</span>
                  </div>
                  <Progress 
                    value={(value.consumed / value.target) * 100} 
                    className="w-full"
                  />
                </GlassCard>
              ))}
            </div>

            {/* Meals */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Today's Meals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meals.map((meal) => (
                  <GlassCard key={meal.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <meal.icon className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">{meal.name}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {meal.calories} cal
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {meal.items.map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {item}
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant={meal.logged ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {meal.logged ? "Edit Meal" : "Log Meal"}
                    </Button>
                  </GlassCard>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <MealScanner onScanComplete={handleMealScanComplete} />
            </div>
          </TabsContent>

          <TabsContent value="meals">
            <div className="py-6">
              <h3 className="text-2xl font-bold font-orbitron gradient-text mb-5 text-center">Weekly Meal Plan</h3>
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                {mealPlan.slice(0, 4).map((plan) => (
                  <GlassCard key={plan.day} className="w-56 px-5 py-4 text-center shadow-md border border-primary/10 bg-background/80 backdrop-blur">
                    <div className="font-semibold text-lg text-primary mb-2">{plan.day}</div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm text-left">
                      {plan.meals.map((meal, idx) => (
                        <li key={idx}>{meal}</li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {mealPlan.slice(4).map((plan) => (
                  <GlassCard key={plan.day} className="w-56 px-5 py-4 text-center shadow-md border border-primary/10 bg-background/80 backdrop-blur">
                    <div className="font-semibold text-lg text-primary mb-2">{plan.day}</div>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm text-left">
                      {plan.meals.map((meal, idx) => (
                        <li key={idx}>{meal}</li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <GlassCard className="py-6 px-4 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold font-orbitron gradient-text mb-5 text-center">Recent Nutrition History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full rounded-xl overflow-hidden shadow bg-background/80 backdrop-blur border border-primary/10 text-base">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary/10 to-accent/10">
                      <th className="px-5 py-3 text-left font-semibold text-primary">Date</th>
                      <th className="px-5 py-3 text-left font-semibold text-primary">Meal</th>
                      <th className="px-5 py-3 text-left font-semibold text-primary">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionHistory.map((entry, idx) => (
                      <tr key={idx} className={"transition-colors hover:bg-primary/5 " + (idx % 2 === 0 ? 'bg-background/60' : 'bg-background/80')}>
                        <td className="px-5 py-3 text-foreground whitespace-nowrap">{entry.date}</td>
                        <td className="px-5 py-3 text-muted-foreground">{entry.meal}</td>
                        <td className="px-5 py-3 text-accent font-semibold">{entry.calories}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Nutrition;
