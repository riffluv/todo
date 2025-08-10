"use client";

import React, { createContext, useContext, useCallback } from "react";
import { PawEffect, usePawEffect } from "../effects/PawEffect";

interface PawEffectContextType {
  triggerPawEffect: (x: number, y: number) => void;
}

const PawEffectContext = createContext<PawEffectContextType | null>(null);

export function PawEffectProvider({ children }: { children: React.ReactNode }) {
  const { effects, addPawEffect, removeEffect } = usePawEffect();

  const triggerPawEffect = useCallback((x: number, y: number) => {
    addPawEffect(x, y);
  }, [addPawEffect]);

  return (
    <PawEffectContext.Provider value={{ triggerPawEffect }}>
      {children}
      <PawEffect effects={effects} onEffectComplete={removeEffect} />
    </PawEffectContext.Provider>
  );
}

export function usePawEffectContext() {
  const context = useContext(PawEffectContext);
  if (!context) {
    throw new Error("usePawEffectContext must be used within PawEffectProvider");
  }
  return context;
}
