
import { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <GlassCard className="text-center group">
      <div className={`inline-flex p-4 rounded-2xl mb-6 ${gradient} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
