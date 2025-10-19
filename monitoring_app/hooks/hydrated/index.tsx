"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const HydrationContext = createContext({
  hydrated: false,
});

export function HydrationProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <HydrationContext.Provider value={{ hydrated: isHydrated }}>{children}</HydrationContext.Provider>;
}

export function useHydration() {
  const context = useContext(HydrationContext);

  if (!context) {
    throw new Error("useHydration must be wrapped in HydrationProvider");
  }

  return context;
}
