"use client";

import * as React from "react";

import { User as AuthUser } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/client/client";

import { Database } from "@/types/supabase";

export const AuthContext = React.createContext<
  | {
      authUser: AuthUser | undefined;
      user: Database["public"]["Tables"]["users"]["Row"] | undefined;
      isAuthenticated: boolean;
      loading: boolean;
      logIn: (email: string, password: string) => any;
      logOut: () => any;
      refreshUser: () => any;
    }
  | undefined
>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = React.useState<AuthUser | undefined>(
    undefined
  );
  const [user, setUser] = React.useState<
    Database["public"]["Tables"]["users"]["Row"] | undefined
  >(undefined);
  const [loading, setLoading] = React.useState(true);

  const initAuthUser = async () => {
    setLoading(true);

    const supabase = createClient();

    const {
      data: { user: fetchedAuthUser },
    } = await supabase.auth.getUser();
    setAuthUser(fetchedAuthUser || undefined);

    setLoading(false);
  };

  const fetchUser = async () => {
    if (!authUser?.id) return;

    const supabase = createClient();

    const { data: fetchedUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (error) {
      console.error("Failed to fetch user:", error);
      return;
    }

    setUser(fetchedUser || undefined);
  };

  React.useEffect(() => {
    initAuthUser();
  }, []);

  React.useEffect(() => {
    if (!authUser) {
      setUser(undefined);
      return;
    }

    fetchUser();
  }, [authUser]);

  React.useEffect(() => {
    const supabase = createClient();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || undefined);
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const logIn = async (email: string, password: string) => {
    setLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return { error: error.message };
    }

    setAuthUser(data.user);
    await fetchUser();
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);

    const supabase = createClient();

    await supabase.auth.signOut();

    setAuthUser(undefined);
    setUser(undefined);

    setLoading(false);
  };

  const isAuthenticated = !!authUser;

  return (
    <AuthContext.Provider
      value={{
        authUser,
        user,
        isAuthenticated,
        loading,
        logIn,
        logOut,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
