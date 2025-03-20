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
      <div className="relative hidden h-full lg:block">
        <div className="absolute inset-0 h-full w-full bg-primary" />
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="px-8 text-center text-white animate-in fade-in slide-in-from-right-4 duration-700">
            <h2 className="mb-4 text-3xl font-bold">Join Refine Today</h2>
            <p className="text-lg opacity-90">
              Start your journey of personal growth and self-discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
