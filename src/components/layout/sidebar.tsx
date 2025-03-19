"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar, Home, Settings, ListTodo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: ListTodo,
    label: "Tasks",
    href: "/tasks",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/calendar",
  },
] as const;

const settingsItem = {
  icon: Settings,
  label: "Settings",
  href: "/settings",
} as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[200px] border-r flex flex-col gap-2 p-2">
      <div className="text-xl font-semibold px-2 py-4">Refine</div>
      <nav className="flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start gap-2", {
                "bg-accent": pathname === item.href,
              })}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="flex-1" />
      <Link href={settingsItem.href}>
        <Button
          variant="ghost"
          className={cn("w-full justify-start gap-2", {
            "bg-accent": pathname === settingsItem.href,
          })}
        >
          <settingsItem.icon className="h-4 w-4" />
          {settingsItem.label}
        </Button>
      </Link>
    </div>
  );
}
