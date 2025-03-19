"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Calendar, ListTodo, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: ListTodo,
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: Calendar,
    },
  ];

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[200px]"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="text-2xl font-bold text-primary">refine</h1>}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
