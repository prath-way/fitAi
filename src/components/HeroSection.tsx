
import { Button } from "@/components/ui/button";
import { GlassCard } from "./GlassCard";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-purple/10 via-electric-blue/10 to-neon-green/10 animate-gradient bg-[length:400%_400%]" />
      
      <div className="container mx-auto text-center z-10">
        {/* Main headline */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold font-orbitron mb-6">
            <span className="gradient-text">AI FITNESS</span>
            <br />
            <span className="text-foreground">REVOLUTION</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your body with personalized AI-powered workouts and nutrition plans. 
            The future of fitness is here.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-6 text-lg rounded-full neon-glow group">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-primary/50 text-primary hover:bg-primary/10 font-semibold px-8 py-6 text-lg rounded-full">
            Watch Demo
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-neon-green to-electric-blue">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">
              <AnimatedCounter end={50000} suffix="+" />
            </div>
            <p className="text-muted-foreground">Active Users</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-coral-pink to-deep-purple">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">
              <AnimatedCounter end={95} suffix="%" />
            </div>
            <p className="text-muted-foreground">Goal Achievement</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-electric-blue to-neon-green">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold gradient-text mb-2">
              <AnimatedCounter end={1200} suffix="+" />
            </div>
            <p className="text-muted-foreground">Workout Plans</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
