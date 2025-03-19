export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Refine. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 