import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm text-fuchsia-400">404</p>
        <h1 className="font-display text-5xl font-bold mt-2">Page not found</h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          The twin couldn't locate that route. Let's get you back home.
        </p>
        <Link href="/" className="inline-block mt-6">
          <Button variant="gradient">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
