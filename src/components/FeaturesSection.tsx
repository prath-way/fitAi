
import { FeatureCard } from "./FeatureCard";
import { Brain, Utensils, Activity, BarChart3, Calendar, Users } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      title: "AI-Powered Recommendations",
      description: "Advanced machine learning algorithms analyze your progress and adapt your plans in real-time for optimal results.",
      gradient: "bg-gradient-to-r from-deep-purple to-electric-blue"
    },
    {
      icon: <Utensils className="h-8 w-8 text-white" />,
      title: "Smart Nutrition Plans",
      description: "Personalized meal plans that consider your dietary preferences, allergies, and nutritional goals.",
      gradient: "bg-gradient-to-r from-coral-pink to-neon-green"
    },
    {
      icon: <Activity className="h-8 w-8 text-white" />,
      title: "Dynamic Workouts",
      description: "Customized exercise routines that evolve with your fitness level and keep you motivated.",
      gradient: "bg-gradient-to-r from-neon-green to-electric-blue"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "Progress Analytics",
      description: "Comprehensive tracking and beautiful visualizations of your fitness journey and achievements.",
      gradient: "bg-gradient-to-r from-electric-blue to-coral-pink"
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Smart Scheduling",
      description: "Intelligent workout and meal scheduling that fits perfectly into your busy lifestyle.",
      gradient: "bg-gradient-to-r from-deep-purple to-neon-green"
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Community Support",
      description: "Connect with like-minded individuals and share your fitness journey with our supportive community.",
      gradient: "bg-gradient-to-r from-coral-pink to-electric-blue"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-orbitron mb-6">
            <span className="gradient-text">FEATURES</span> THAT MATTER
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology meets personalized fitness to deliver unprecedented results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
