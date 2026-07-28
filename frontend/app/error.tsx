"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-4">
      <div className="space-y-4 text-center max-w-[500px]">
        <h1 className="text-4xl font-bold tracking-tight text-black">
          Something went wrong!
        </h1>
        <p className="text-black/50">
          An unexpected rendering error occurred. We apologize for the inconvenience.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center rounded-full border border-black/20 px-6 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
