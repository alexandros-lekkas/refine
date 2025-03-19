import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Total Tasks",
    value: "0",
    icon: "📝",
  },
  {
    title: "Completed",
    value: "0",
    icon: "✅",
  },
  {
    title: "Pending",
    value: "0",
    icon: "⏳",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Welcome back! Here's an overview of your tasks and schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <span className="text-2xl">{stat.icon}</span>
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
          <Link href="/dashboard/tasks">
            <Button className="w-full justify-between" variant="outline">
              View All Tasks
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard/tasks">
            <Button className="w-full justify-between bg-primary hover:bg-primary/90">
              Add New Task
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
} 