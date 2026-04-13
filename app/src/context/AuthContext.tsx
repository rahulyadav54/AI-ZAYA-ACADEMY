import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('zaya_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication - in real app, validate against backend
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('zaya_user', JSON.stringify(foundUser));
      return true;
    }
    
    // For demo, allow any login with demo accounts
    if (email === 'student@demo.com') {
      const demoStudent = mockUsers[0];
      setUser(demoStudent);
      localStorage.setItem('zaya_user', JSON.stringify(demoStudent));
      return true;
    }
    if (email === 'instructor@demo.com') {
      const demoInstructor = mockUsers[1];
      setUser(demoInstructor);
      localStorage.setItem('zaya_user', JSON.stringify(demoInstructor));
      return true;
    }
    if (email === 'admin@demo.com') {
      const demoAdmin = mockUsers[2];
      setUser(demoAdmin);
      localStorage.setItem('zaya_user', JSON.stringify(demoAdmin));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, _password: string, role: UserRole = 'student'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('zaya_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zaya_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
