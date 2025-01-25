"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type SocketStore, createSocketStore } from "@/app/store/socket-store";

export type SocketStoreApi = ReturnType<typeof createSocketStore>;

export const SocketStoreContext = createContext<SocketStoreApi | undefined>(
  undefined
);

export interface SocketStoreProviderProps {
  children: ReactNode;
}

export function SocketStoreProvider({ children }: SocketStoreProviderProps) {
  const storeRef = useRef<SocketStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createSocketStore();
  }

  return (
    <SocketStoreContext.Provider value={storeRef.current}>
      {children}
    </SocketStoreContext.Provider>
  );
}

export const useSocketStore = <T,>(selector: (store: SocketStore) => T): T => {
  const socketStoreContext = useContext(SocketStoreContext);

  if (!socketStoreContext) {
    throw new Error(`useSocketStore must be used within SocketStoreProvider`);
  }

  return useStore(socketStoreContext, selector);
};
