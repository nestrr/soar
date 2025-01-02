"use client";
import {
  createSendTransport,
  loadDevice,
  ConnectionEventHandlers,
  createRecvTransport,
} from "@/app/spaces/actions/device-handlers";
import { generateSlug } from "random-word-slugs";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { toaster } from "@/app/components/ui/toaster";
import type { Callback, Errback } from "@/app/store/participant-store";
import { types as MediasoupClientTypes } from "mediasoup-client";
import { MediasoupTypes as MediasoupServerTypes } from "@/signaling/lib/mediasoup";
import React, { useEffect, useRef, useState } from "react";
import { WebSocket } from "partysocket";
import { useSession } from "next-auth/react";
import type {
  EnterRoomMessage,
  MessageTypes,
  ProduceMessage,
  Signal,
  UserIdMessage,
  WebRtcTransportsMessage,
} from "@/app/spaces/message-types";
import { Except } from "type-fest";
export type TransportHandlers = {
  connect: (
    transportId: string,
    dtlsParameters: MediasoupClientTypes.DtlsParameters,
    callback: Callback,
    errback: Errback
  ) => void;
  produce: (
    transportId: string,
    producerOptions: MediasoupServerTypes.ProducerOptions,
    callback: ({ id }: { id: string }) => void,
    errback: Errback
  ) => void;
  connectionstatechange: (
    state: MediasoupClientTypes.ConnectionState,
    producerTransport: MediasoupClientTypes.Transport
  ) => void;
};
export type MessageHandlers = Record<
  MessageTypes,
  (message: Signal) => void | Promise<void>
>;

export default function WebSocketProvider({
  accessToken,
}: {
  accessToken?: string;
}) {
  const {
    setUserInfo,
    device,
    user,
    activeRoom,
    addTransportCallback,
    addTransportErrback,
    setWebsocket,
  } = useParticipantStore((state) => state);
  const { data: session } = useSession();
  const [roomId, setRoomId] = useState("");
  // const connected = useRef(false);
  const wss = useRef<null | WebSocket>(null);
  const stateChangeHandlers: ConnectionEventHandlers = {
    producerTransport: {
      disconnected: (transport: MediasoupClientTypes.Transport) => {
        console.log("Producer Transport disconnected", {
          id: transport.id,
        });

        // restartIce();

        // toast(
        //   "warning",
        //   "Producer Transport lost",
        //   "Network connection may have dropped or changed (Restarted ICE)",
        //   "top-end",
        //   6000,
        //   true
        // );

        // break;
      },
      failed: (transport: MediasoupClientTypes.Transport) => {
        console.warn("Producer Transport failed", { id: transport.id });
        // toast w/action
        // popupHtmlMessage(
        //   null,
        //   image.network,
        //   "Producer Transport failed",
        //   "Check Your Network Configuration",
        //   "center",
        //   false,
        //   true
        // );

        // break;
      },
    },
    consumerTransport: {
      disconnected: (transport: MediasoupClientTypes.Transport) => {
        console.log("Consumer Transport disconnected", {
          id: transport.id,
        });

        // restartIce();

        // toast(
        //   "warning",
        //   "Producer Transport lost",
        //   "Network connection may have dropped or changed (Restarted ICE)",
        //   "top-end",
        //   6000,
        //   true
        // );

        // break;
      },
      failed: (transport: MediasoupClientTypes.Transport) => {
        console.warn("Consumer Transport failed", { id: transport.id });
        // toast w/action
        // popupHtmlMessage(
        //   null,
        //   image.network,
        //   "Producer Transport failed",
        //   "Check Your Network Configuration",
        //   "center",
        //   false,
        //   true
        // );

        // break;
      },
    },
  };
  const producerTransportHandlers: TransportHandlers = {
    connect: (
      transportId: string,
      dtlsParameters: MediasoupClientTypes.DtlsParameters,
      callback: Callback,
      errback: Errback
    ) => {
      try {
        wss.current!.send(
          JSON.stringify({
            type: "connectTransport",
            transportId,
            dtlsParameters,
          })
        );
        callback();
      } catch (err) {
        errback(err as unknown as Error);
      }
    },
    produce: (transportId, producerOptions, callback, errback) => {
      const { kind, appData, rtpParameters } = producerOptions;
      console.log("Going to produce", { kind, appData, rtpParameters });
      try {
        wss.current!.send(
          JSON.stringify({
            type: "produce",
            producerTransportId: transportId,
            roomId,
            kind,
            appData,
            rtpParameters,
          })
        );
        addTransportCallback(transportId, callback as Callback);
        addTransportErrback(transportId, errback as Callback);
      } catch (err) {
        errback(err as unknown as Error);
      }
    },
    connectionstatechange: (
      state: MediasoupClientTypes.ConnectionState,
      producerTransport: MediasoupClientTypes.Transport
    ) => {
      stateChangeHandlers.producerTransport[state]?.(producerTransport);
    },
  };
  const consumerTransportHandlers: Except<TransportHandlers, "produce"> = {
    connect: (
      transportId: string,
      dtlsParameters: MediasoupClientTypes.DtlsParameters,
      callback: Callback,
      errback: Errback
    ) => {
      try {
        wss.current!.send(
          JSON.stringify({
            type: "connectTransport",
            transportId: transportId,
            dtlsParameters,
          })
        );
        addTransportCallback(transportId, callback);
        addTransportErrback(transportId, errback);
      } catch (err) {
        errback(err as unknown as Error);
      }
    },
    connectionstatechange: (
      state: MediasoupClientTypes.ConnectionState,
      consumerTransport: MediasoupClientTypes.Transport
    ) => {
      stateChangeHandlers.consumerTransport[state]?.(consumerTransport);
    },
  };
  const messageHandlers: MessageHandlers = {
    userIdUpdate: (message) => {
      const { success, contents } = message as UserIdMessage;
      if (!success) {
        toaster.error({
          title: "Error getting user ID",
          description:
            "The server wasn't able to get your user ID set up. Check the server logs for more information.",
        });
        return;
      }
      if (!!session?.user)
        setUserInfo({
          userId: session.user.id!,
          authStatus: "authenticated",
          displayName: session.user.name!,
        });
      else {
        console.log(contents.userId);
        setUserInfo({
          userId: contents.userId as string,
          authStatus: "unauthenticated",
          displayName: generateSlug(2, { format: "title" }),
        });
      }
    },
    joinRoomUpdate: async (message) => {
      const { success, contents: roomDetails } = message as EnterRoomMessage;
      console.log(roomDetails);
      if (!success) {
        toaster.error({
          title: "Error joining room",
          description: "Check the server logs for more information.",
        });
        return;
      }
      await enterRoom(roomDetails);
    },
    createRoomUpdate: async (message) => {
      const { success, contents: roomDetails } = message as EnterRoomMessage;
      if (!success) {
        toaster.error({
          title: "Error creating room",
          description: "Check the server logs for more information.",
        });
        return;
      }
      console.log(user);
      await enterRoom(roomDetails);
    },
    createWebRtcTransportsUpdate: (message) => {
      const { success, contents } = message as WebRtcTransportsMessage;
      if (!success || !device) {
        toaster.error({
          title: "Error creating WebRTC transports",
          description:
            "Device may not exist. Check the server logs for more information.",
        });
        return;
      }
      const { producerTransportOptions, consumerTransportOptions } = contents;
      createSendTransport(
        device,
        producerTransportOptions,
        producerTransportHandlers
      );
      createRecvTransport(
        device,
        consumerTransportOptions,
        consumerTransportHandlers
      );
    },
    produceUpdate: (message) => {
      const { success, contents } = message as ProduceMessage;
      if (!success) {
        toaster.error({
          title: "Error creating producer",
          description: "Check the server logs for more information.",
        });
        return;
      }
      const { producerId, producerTransportId } = contents;
      const transportCallback =
        activeRoom!.transportCallbacks[producerTransportId];

      transportCallback({ id: producerId });
    },
  };
  async function enterRoom(contents: EnterRoomMessage["contents"]) {
    setRoomId(contents.roomId);
    console.log(device, accessToken, user);
    if (!device) {
      toaster.error({
        title: "Error entering room",
        description:
          "Device has not been created by your browser yet. Please try again.",
      });
      return;
    }
    if (!device.loaded) {
      const loaded = await loadDevice(device, contents.routerRtpCapabilities);
      if (loaded) {
        wss.current!.send(
          JSON.stringify({
            type: "createWebRtcTransports",
            rtpCapabilities: device.rtpCapabilities,
            roomId: contents.roomId,
          })
        );
      } else {
        console.log("Device not loaded");
      }
    }
  }
  useEffect(() => {
    if (!wss.current && device && user) {
      console.log("device", device);
      console.log("user", user);
      wss.current = new WebSocket(
        `wss://localhost:3001/?accessToken=${accessToken}&userId=${user?.userId}`,
        [],
        {
          startClosed: true,
        }
      );

      wss.current.addEventListener("open", (e) => {
        console.log("client connected", e);
        // socket.send(JSON.stringify({ type: "joinRoom", roomId }));
      });
      wss.current.addEventListener("close", (e) => {
        console.log("closed");
        console.log(e);
      });
      wss.current.addEventListener("error", (e) => {
        console.log(e);
        console.log("error");
      });
      wss.current.addEventListener("message", (e) => {
        const message: Signal = JSON.parse(e.data);
        const handler = messageHandlers[message.type];
        if (handler) {
          Promise.resolve(handler(message));
        } else {
          console.log("Unknown message type", message.type);
        }
      });
      setWebsocket(wss.current!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, device, user, user?.userId]);
  return <></>;
}
