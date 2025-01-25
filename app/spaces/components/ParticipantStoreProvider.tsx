"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type ParticipantStore,
  createParticipantStore,
} from "@/app/store/participant-store";

export type ParticipantStoreApi = ReturnType<typeof createParticipantStore>;

export const ParticipantStoreContext = createContext<
  ParticipantStoreApi | undefined
>(undefined);

export interface ParticipantStoreProviderProps {
  children: ReactNode;
}

export function ParticipantStoreProvider({
  children,
}: ParticipantStoreProviderProps) {
  const storeRef = useRef<ParticipantStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createParticipantStore();
  }

  return (
    <ParticipantStoreContext.Provider value={storeRef.current}>
      {children}
    </ParticipantStoreContext.Provider>
  );
}

export const useParticipantStore = <T,>(
  selector: (store: ParticipantStore) => T
): T => {
  const participantStoreContext = useContext(ParticipantStoreContext);

  if (!participantStoreContext) {
    throw new Error(
      `useParticipantStore must be used within ParticipantStoreProvider`
    );
  }

  return useStore(participantStoreContext, selector);
};
