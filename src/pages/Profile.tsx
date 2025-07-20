
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/AppLayout';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Save, Target } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    age: user?.profile?.age || '',
    gender: user?.profile?.gender || '',
    height: user?.profile?.height || '',
    weight: user?.profile?.weight || '',
    activityLevel: user?.profile?.activityLevel || '',
    fitnessGoal: user?.profile?.fitnessGoal || '',
    allergies: user?.profile?.allergies || [],
  });

  // Removed dietary preferences state and handlers
  const [newAllergy, setNewAllergy] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      age: Number(formData.age),
      gender: formData.gender as any,
      height: Number(formData.height),
      weight: Number(formData.weight),
      activityLevel: formData.activityLevel as any,
      fitnessGoal: formData.fitnessGoal as any,
      allergies: formData.allergies,
    };
    const success = await updateProfile(profileData);
    if (success) {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });
    } else {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Removed dietary preferences handlers

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron gradient-text mb-2">
            Your Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Customize your fitness and nutrition preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-6">
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="175"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="70"
                />
              </div>
            </div>
          </GlassCard>

          {/* Fitness Goals */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Fitness Goals</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (2x/day, intense)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fitnessGoal">Primary Fitness Goal</Label>
                <Select value={formData.fitnessGoal} onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessGoal: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitness goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>

          {/* Allergies */}
          <GlassCard>
            <h2 className="text-2xl font-semibold mb-6">Allergies</h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy (e.g., Nuts, Dairy, Gluten)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
                />
                <Button type="button" onClick={addAllergy}>
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="cursor-pointer" onClick={() => removeAllergy(allergy)}>
                    {allergy} ×
                  </Badge>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Save Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 px-8"
              disabled={isLoading}
            >
              <Save className="h-5 w-5 mr-2" />
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default Profile;
