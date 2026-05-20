"use client";

import { PlayFoundProvider } from "@/lib/settings-context";
import { AuthProvider } from "@/lib/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlayFoundProvider>
      <AuthProvider>{children}</AuthProvider>
    </PlayFoundProvider>
  );
}
