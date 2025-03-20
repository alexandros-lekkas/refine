"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        }
      );

      if (signUpError) {
        console.error("Signup error details:", {
          message: signUpError.message,
          status: signUpError.status,
          name: signUpError.name,
        });
        throw signUpError;
      }

      setIsSuccess(true);
      // Show success message or redirect to a verification page
      router.push("/auth/verify-email");
    } catch (error) {
      console.error("Full signup error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "An unexpected error occurred during signup. Please try again."
        );
      }
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Refine
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className={cn("flex flex-col gap-6")} onSubmit={handleSignUp}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold animate-in fade-in slide-in-from-top-4 duration-500">Create your account</h1>
                <p className="text-balance text-sm text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-500">
                  Enter your details below to create your account
                </p>
              </div>
              {error && (
                <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive animate-in fade-in duration-300">
                  {error}
                </div>
              )}
              {isSuccess && (
                <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 animate-in fade-in duration-300">
                  Account created successfully! Please check your email for
                  verification.
                </div>
              )}
              <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex relative flex-col justify-center p-12 bg-[#0B0A0F] text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-br from-[#FF3DC0] to-purple-600 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-600 to-[#FF3DC0] rounded-full opacity-20 blur-3xl" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
        
        <div className="relative max-w-2xl space-y-12">
          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-[4rem] leading-none font-extralight">
              Your Academic
              <br />
              Success,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">
                AI-Powered
              </span>
            </h2>
          </div>
          
          {/* Benefits Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <span className="text-2xl block mb-2">📉</span>
              <h3 className="font-medium mb-1">Less Cramming</h3>
              <p className="text-sm text-gray-400">Know exactly when to start working on assignments.</p>
            </div>
            
            <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <span className="text-2xl block mb-2">⏳</span>
              <h3 className="font-medium mb-1">Less Stress</h3>
              <p className="text-sm text-gray-400">AI plans your study schedule so you don&apos;t have to.</p>
            </div>
            
            <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <span className="text-2xl block mb-2">📅</span>
              <h3 className="font-medium mb-1">No More Missed Dates</h3>
              <p className="text-sm text-gray-400">Automatic LMS syncing from Canvas, Blackboard & more.</p>
            </div>
            
            <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <span className="text-2xl block mb-2">🧠</span>
              <h3 className="font-medium mb-1">Smarter Studying</h3>
              <p className="text-sm text-gray-400">Personalized study plans that adapt to you.</p>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-block px-6 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-lg font-medium">✨ Sign up now and let Refine (AI) handle the planning! ✨</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
