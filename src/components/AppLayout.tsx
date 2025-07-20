
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FloatingElements } from '@/components/FloatingElements';
import { toast } from '@/hooks/use-toast';
import { 
  Home, 
  User, 
  Activity, 
  Utensils, 
  TrendingUp, 
  Settings, 
  LogOut,
  Shield,
  Dumbbell
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate('/');
  };

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/workouts', icon: Activity, label: 'Workouts' },
    { path: '/nutrition', icon: Utensils, label: 'Nutrition' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
  ];

  if (user?.role === 'admin') {
    navigationItems.push({ path: '/admin', icon: Shield, label: 'Admin' });
  }

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-accent">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-orbitron gradient-text">
                FitAI
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/20 text-primary'
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Welcome,</span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 flex overflow-x-auto space-x-4 pb-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground hover:text-primary hover:bg-primary/10'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};
