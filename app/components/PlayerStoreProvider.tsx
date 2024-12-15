"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type PlayerStore, createPlayerStore } from "@/app/store/player-store";

export type PlayerStoreApi = ReturnType<typeof createPlayerStore>;

export const PlayerStoreContext = createContext<PlayerStoreApi | undefined>(
  undefined
);

export interface PlayerStoreProviderProps {
  children: ReactNode;
}

export function PlayerStoreProvider({ children }: PlayerStoreProviderProps) {
  const storeRef = useRef<PlayerStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createPlayerStore();
  }

  return (
    <PlayerStoreContext.Provider value={storeRef.current}>
      {children}
    </PlayerStoreContext.Provider>
  );
}

export const usePlayerStore = <T,>(selector: (store: PlayerStore) => T): T => {
  const playerStoreContext = useContext(PlayerStoreContext);

  if (!playerStoreContext) {
    throw new Error(`usePlayerStore must be used within PlayerStoreProvider`);
  }

  return useStore(playerStoreContext, selector);
};
