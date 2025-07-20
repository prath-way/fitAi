
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/utils';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  profile?: {
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    fitnessGoal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
    dietaryPreferences: string[];
    allergies: string[];
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<User['profile']>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.session) {
        return false;
      }
      const { user: supaUser } = data;
      const firstName = supaUser.user_metadata?.full_name?.split(' ')[0] || supaUser.email.split('@')[0];
      
      // Fetch existing profile data from Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supaUser.id)
        .single();
      
      const userObj: User = {
        id: supaUser.id,
        email: supaUser.email,
        name: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
        role: 'user',
        profile: profileData || undefined,
      };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (error || !data.user) {
        return false;
      }
      const userObj: User = {
        id: data.user.id,
        email: data.user.email,
        name: name.split(' ')[0].charAt(0).toUpperCase() + name.split(' ')[0].slice(1).toLowerCase(),
        role: 'user',
      };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (profile: Partial<User['profile']>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // First, let's test if we can read from the profiles table
      console.log('Testing profiles table connection...');
      const { data: testData, error: testError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (testError) {
        console.error('Cannot access profiles table:', testError);
        return false;
      }
      
      console.log('Profiles table accessible, test data:', testData);
      
      // Convert string values to numbers and prepare data
      const profileData = {
        user_id: user.id,
        age: profile.age ? Number(profile.age) : null,
        gender: profile.gender || null,
        height: profile.height ? Number(profile.height) : null,
        weight: profile.weight ? Number(profile.weight) : null,
        activity_level: profile.activityLevel || null,
        fitness_goal: profile.fitnessGoal || null,
        allergies: profile.allergies || [],
        updated_at: new Date().toISOString(),
      };

      console.log('User ID:', user.id);
      console.log('Sending profile data:', profileData);
      
      // Save profile data to Supabase
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });
      
      if (error) {
        console.error('Supabase upsert error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return false;
      }
      
      console.log('Profile updated successfully:', data);
      
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profile }
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
