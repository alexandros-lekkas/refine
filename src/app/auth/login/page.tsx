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
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
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
                <h1 className="text-4xl font-bold text-gray-900 animate-in fade-in slide-in-from-top-4 duration-500">Login to your account</h1>
                <p className="text-balance text-base text-gray-500 animate-in fade-in slide-in-from-top-4 duration-500">
                  Enter your email below to login to your account
                </p>
              </div>
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 animate-in fade-in duration-300">
                  {error}
                </div>
              )}
              <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-700 text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-gray-700 text-base">Password</Label>
                    <Link
                      href="/auth/reset-password"
                      className="ml-auto text-base text-primary hover:text-primary/90 hover:underline font-medium"
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
                    className="h-12 text-base"
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Login
                </Button>
              </div>
              <div className="text-center">
                <p className="text-base text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl"></div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome back!</h2>
            <p className="text-lg text-gray-600">
              Log in to access your personalized study plans, track your progress, and stay on top of your academic goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
