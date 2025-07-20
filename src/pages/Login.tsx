
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      // Check if profile is incomplete (age, gender, height, weight missing)
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (!storedUser.profile || !storedUser.profile.age || !storedUser.profile.gender || !storedUser.profile.height || !storedUser.profile.weight) {
        navigate('/profile');
      } else {
        navigate('/dashboard');
      }
      toast({
        title: "Login Successful",
        description: "Welcome back to FitAI!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-purple/10 via-electric-blue/10 to-neon-green/10 flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-orbitron gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your fitness journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>

      </GlassCard>
    </div>
  );
};

export default Login;
