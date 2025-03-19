"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Calendar, Clock, Plus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const stats = [
    {
      title: "Tasks Due Today",
      value: "3",
      icon: Clock,
    },
    {
      title: "Completed Tasks",
      value: "12",
      icon: CheckCircle2,
    },
    {
      title: "Upcoming Tasks",
      value: "8",
      icon: Calendar,
    },
  ];

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Welcome to refine</h2>
          <p className="text-lg text-muted-foreground">
            Your smart task management companion for academic success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/tasks">
              <Button className="w-full justify-between" variant="outline">
                View All Tasks
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/tasks">
              <Button className="w-full justify-between bg-primary hover:bg-primary/90">
                Add New Task
                <Plus className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
