"use client";

import React, { createContext, useCallback, useContext } from "react";
import { PawEffect, usePawEffect } from "../effects/PawEffect";

interface PawEffectContextType {
  triggerPawEffect: (x: number, y: number) => void;
}

const PawEffectContext = createContext<PawEffectContextType | null>(null);

export function PawEffectProvider({ children }: { children: React.ReactNode }) {
  const { effects, addPawEffect, removeEffect } = usePawEffect();

  const triggerPawEffect = useCallback(
    (x: number, y: number) => {
      addPawEffect(x, y);
    },
    [addPawEffect],
  );

  return (
    <PawEffectContext.Provider value={{ triggerPawEffect }}>
      {children}
      <PawEffect effects={effects} onEffectComplete={removeEffect} />
    </PawEffectContext.Provider>
  );
}

export function usePawEffectContext(): PawEffectContextType {
  const context = useContext(PawEffectContext);
  if (!context) {
    // Provider がない環境（テストなど）では安全に何もしない
    return { triggerPawEffect: () => {} };
  }
  return context;
}
