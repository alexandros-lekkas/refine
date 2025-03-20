"use client";

import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TaskProvider } from "@/contexts/TaskContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TaskProvider>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
        <Toaster />
      </TaskProvider>
    </ThemeProvider>
  );
}