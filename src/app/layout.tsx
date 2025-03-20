import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { TaskProvider } from "@/lib/contexts/TaskContext";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refine",
  description: "Your personal productivity companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(figtree.className, "min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TaskProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
