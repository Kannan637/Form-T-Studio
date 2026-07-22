"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4">
      <div className="space-y-4 text-center max-w-[500px]">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground">
          An unexpected rendering error occurred. We apologize for the inconvenience.
        </p>
        <Button onClick={() => reset()} className="mt-6">
          Try again
        </Button>
      </div>
    </div>
  );
}
