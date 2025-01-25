import { createStore } from "zustand/vanilla";

export type PlayerState = {
  type: string;
  id: string;
};

export type PlayerActions = {
  setType: (newType: string) => void;
  setId: (newId: string) => void;
};

export type PlayerStore = PlayerState & PlayerActions;

export const defaultInitState: PlayerState = {
  type: "",
  id: "",
};

export const createPlayerStore = (
  initState: PlayerState = defaultInitState
) => {
  return createStore<PlayerStore>()((set) => ({
    ...initState,
    setType: (newType: string) => set((state) => ({ type: newType })),
    setId: (newId: string) => set((state) => ({ id: newId })),
  }));
};
