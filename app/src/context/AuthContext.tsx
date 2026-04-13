import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User, UserRole } from '@/types';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<AuthResult>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAppUser(authUser: SupabaseUser): User {
  const metadata = authUser.user_metadata ?? {};
  const role = (metadata.role as UserRole) ?? 'student';
  const safeRole: UserRole = ['student', 'instructor', 'admin'].includes(role) ? role : 'student';
  const email = authUser.email ?? '';
  const defaultName = email ? email.split('@')[0] : 'User';
  const name = metadata.name ?? metadata.full_name ?? defaultName;
  const avatar =
    metadata.avatar_url ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email || authUser.id)}`;

  return {
    id: authUser.id,
    email,
    name,
    role: safeRole,
    avatar,
    createdAt: new Date(authUser.created_at),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }
    const client = supabase;

    let mounted = true;

    const initAuth = async () => {
      const { data } = await client.auth.getSession();
      if (!mounted) return;
      setUser(data.session?.user ? toAppUser(data.session.user) : null);
      setIsLoading(false);
    };

    const { data: subscription } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toAppUser(session.user) : null);
      setIsLoading(false);
    });

    void initAuth();

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    if (data.user) {
      setUser(toAppUser(data.user));
    }

    return { success: true };
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole = 'student'
  ): Promise<AuthResult> => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        },
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }

    if (data.user && data.session) {
      setUser(toAppUser(data.user));
      return { success: true };
    }

    return {
      success: true,
      message: 'Account created. Check your email to verify your account before signing in.',
    };
  };

  const logout = () => {
    setUser(null);
    if (supabase) {
      void supabase.auth.signOut();
    }
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
