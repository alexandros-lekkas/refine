import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Refine
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm hover:text-primary">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
} 