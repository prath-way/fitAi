
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, Dumbbell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-accent">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-orbitron gradient-text">
              FitAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              Pricing
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full px-6" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#features" className="block text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#pricing" className="block text-foreground hover:text-primary transition-colors font-medium">
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="justify-start text-foreground hover:text-primary" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
