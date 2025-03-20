"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="font-medium">Refine</span>
          </div>
          <h2 className="text-2xl font-bold text-center">Check your email</h2>
          <p className="text-sm text-muted-foreground text-center">
            We've sent you a verification link. Please check your email to
            verify your account.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-center text-sm">
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 underline underline-offset-4"
            >
              Return to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
