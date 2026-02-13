"use client";

import { ConvexProvider } from "convex/react";
import { useMemo, type ReactNode } from "react";
import { createConvexClient } from "../lib/convex/client";

export default function Providers({ children }: { children: ReactNode }) {
  const convex = useMemo(() => createConvexClient(), []);
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
