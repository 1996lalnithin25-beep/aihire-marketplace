"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(15, 22, 41, 0.9)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            color: "#e2e8f0",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </SessionProvider>
  );
}
