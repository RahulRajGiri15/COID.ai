"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
function ConvexClientProvider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export default ConvexClientProvider;
