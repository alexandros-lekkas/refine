"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckSquare, Calendar, Settings } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full min-h-[80vh] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background" />
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            Welcome to{" "}
            <span className="animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Refine
            </span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Your personal productivity companion. Organize tasks, manage your
            calendar, and stay focused on what matters most. Hope you enjoy. 
          </p>
          <Link href="/dashboard">
            <RainbowButton>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </RainbowButton>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-background shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Task Management</h3>
              <p className="text-muted-foreground">
                Organize your tasks with ease. Create, edit, and track your
                progress all in one place.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Calendar Integration
              </h3>
              <p className="text-muted-foreground">
                Keep track of your schedule with our intuitive calendar
                interface.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-background shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Settings</h3>
              <p className="text-muted-foreground">
                Customize your experience with powerful settings and
                preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Join thousands of users who are already using Refine to boost their
            productivity.
          </p>
          <Link href="/dashboard">
            <RainbowButton
              size="lg"
              className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
            >
              Try it Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </RainbowButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
