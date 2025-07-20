
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { FloatingElements } from '@/components/FloatingElements';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center">
      <FloatingElements />
      
      <div className="container mx-auto px-4 text-center">
        <GlassCard className="max-w-md mx-auto p-8 space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold font-orbitron gradient-text">
              404
            </h1>
            <h2 className="text-2xl font-semibold">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="space-x-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NotFound;
