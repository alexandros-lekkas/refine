"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: Calendar,
    },
  ];

  return (
    <div className="flex h-full w-[200px] flex-col border-r bg-sidebar">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">refine</h1>
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
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
