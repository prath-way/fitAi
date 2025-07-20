
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FloatingElements } from "@/components/FloatingElements";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <FloatingElements />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Index;
