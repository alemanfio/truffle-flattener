"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MOCK_USER } from "@/lib/mock-data";
import type { UserProfile } from "@/lib/types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In demo mode, use mock user. In production, use Supabase auth.
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (isDemoMode) {
      setUser(MOCK_USER);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        supabase
          .from("user_profiles")
          .select("*, user_expert_tags(expert_tags(*))")
          .eq("id", authUser.id)
          .single()
          .then(({ data }) => {
            setUser(data as unknown as UserProfile);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from("user_profiles")
            .select("*, user_expert_tags(expert_tags(*))")
            .eq("id", session.user.id)
            .single();
          setUser(data as unknown as UserProfile);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!isDemoMode) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
