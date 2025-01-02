import { createStore } from "zustand/vanilla";
import { Device, types as MediasoupClientTypes } from "mediasoup-client";
export type Callback = (...args: unknown[]) => void;
export type Errback = (error: Error) => void;
import type { WebSocket } from "partysocket";
type RoomData = {
  id: string;
  muted: boolean;
  cameraOn: boolean;
  producerTransport: MediasoupClientTypes.Transport;
  consumerTransport: MediasoupClientTypes.Transport;
  producer: MediasoupClientTypes.Producer;
  consumer: MediasoupClientTypes.Consumer;
  transportCallbacks: Record<string, Callback>;
  transportErrbacks: Record<string, Errback>;
  permissionsGranted: boolean;
  // TODO: add mediasoup-related properties
};
type ParticipantAuthStatus = "unauthenticated" | "authenticated";
type UserInfo = {
  userId: string;
  displayName: string;
  authStatus: ParticipantAuthStatus;
};

export type ParticipantState = {
  user: UserInfo;
  device: MediasoupClientTypes.Device | null;
  activeRoom: RoomData | null;
  socket: WebSocket | null;
};

export type ParticipantActions = {
  setUserId: (newId: string) => void;
  setDisplayName: (newName: string) => void;
  setAuthStatus: (newStatus: ParticipantAuthStatus) => void;
  setUserInfo: (newInfo: UserInfo) => void;
  setWebsocket: (ws: WebSocket) => void;
  connect: () => void;
  createDevice: (device: MediasoupClientTypes.Device) => void;
  joinRoom: (roomInfo: RoomData) => void;
  leaveRoom: (roomId: string) => void;
  addTransportCallback: (transportId: string, callback: Callback) => void;
  addTransportErrback: (transportId: string, errback: Errback) => void;
};

export type ParticipantStore = ParticipantState & ParticipantActions;

export const defaultInitState: ParticipantState = {
  device: null,
  user: {
    userId: "",
    displayName: "",
    authStatus: "unauthenticated",
  },
  socket: null,
  activeRoom: null,
};

export const createParticipantStore = (
  initState: ParticipantState = defaultInitState
) => {
  return createStore<ParticipantStore>()((set) => ({
    ...initState,
    setUserInfo: (newInfo: UserInfo) => set((_state) => ({ user: newInfo })),
    setUserId: (newId: string) =>
      set((state) => ({ user: { ...state.user, userId: newId } })),
    setAuthStatus: (newStatus: ParticipantAuthStatus) =>
      set((state) => ({ user: { ...state.user, authStatus: newStatus } })),
    setDisplayName: (newDisplayName: string) =>
      set((state) => ({
        user: { ...state.user, displayName: newDisplayName },
      })),
    createDevice: (device: MediasoupClientTypes.Device) =>
      set((state) => ({ ...state, device })),
    joinRoom: (roomInfo: RoomData) =>
      set((state) => ({ ...state, activeRoom: roomInfo })),
    setWebsocket: (ws: WebSocket) => set((state) => ({ ...state, socket: ws })),
    leaveRoom: (_roomId: string) =>
      set((_state) => {
        return { activeRoom: null };
      }),
    addTransportCallback: (transportId: string, callback: Callback) =>
      set((state) => {
        const { activeRoom } = state;
        if (!activeRoom) return state;
        activeRoom.transportCallbacks[transportId] = callback;
        return {
          ...state,
          activeRoom,
        };
      }),
    addTransportErrback: (transportId: string, errback: Errback) =>
      set((state) => {
        const { activeRoom } = state;
        if (!activeRoom) return state;
        activeRoom.transportErrbacks[transportId] = errback;
        return {
          ...state,
          activeRoom,
        };
      }),
    connect: () => {
      set((state) => {
        const { socket } = state;
        if (!socket) return state;
        socket.reconnect();
        return { ...state, socket };
      });
    },
  }));
};
