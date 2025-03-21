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
            <form className={cn("flex flex-col gap-6")} onSubmit={handleSignUp}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-gray-900 animate-in fade-in slide-in-from-top-4 duration-500">Create your account</h1>
                <p className="text-balance text-sm text-gray-500 animate-in fade-in slide-in-from-top-4 duration-500">
                  Enter your details below to create your account
                </p>
              </div>
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 animate-in fade-in duration-300">
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
                    <Label htmlFor="firstName" className="text-gray-700">First name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName" className="text-gray-700">Last name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary/90 underline underline-offset-4"
                >
                  Log in
                </Link>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Refine Today</h2>
            <p className="text-lg text-gray-600">
              Create an account to unlock personalized study plans, AI-powered assistance, and seamless task management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
