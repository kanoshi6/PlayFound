"use client";

import type { ReactNode } from "react";
import { PlayFoundProvider } from "@/lib/settings-context";
import { AuthProvider } from "@/lib/auth-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PlayFoundProvider>
      <AuthProvider>{children}</AuthProvider>
    </PlayFoundProvider>
  );
}
