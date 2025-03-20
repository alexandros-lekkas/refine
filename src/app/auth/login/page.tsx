"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { logIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await logIn(email, password);

      if (result?.error) {
        throw new Error(result.error);
      }
      
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
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
            <form className={cn("flex flex-col gap-6")} onSubmit={handleLogin}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold animate-in fade-in slide-in-from-top-4 duration-500">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-500">
                  Enter your email below to login to your account
                </p>
              </div>
              {error && (
                <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive animate-in fade-in duration-300">
                  {error}
                </div>
              )}
              <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/reset-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
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
        
        <div className="relative max-w-2xl mx-auto text-center">
          {/* Main Heading */}
          <div className="space-y-4">
            <p className="text-[#FF3DC0] font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>3x faster project completion</span>
            </p>
            <h2 className="text-[4rem] leading-none font-extralight">
              Your Academic Success,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">
                AI-Powered
              </span>
            </h2>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-8 mt-12 mb-12">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">87%</div>
              <p className="text-sm text-gray-400">Average Time Saved on Planning</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">2.5x</div>
              <p className="text-sm text-gray-400">Improved Study Efficiency</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">100%</div>
              <p className="text-sm text-gray-400">Assignment Coverage</p>
            </div>
          </div>
          
          {/* Login Prompt */}
          <div className="mt-16">
            <div className="inline-block px-6 py-3 rounded-lg backdrop-blur-sm bg-white/10 border border-white/10 hover:bg-white/15 transition-colors">
              <p className="text-lg font-medium">✨ Log in now and let Refine (AI) handle the planning! ✨</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
