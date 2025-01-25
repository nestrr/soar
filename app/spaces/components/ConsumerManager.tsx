"use client";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { toaster } from "@/app/components/ui/toaster";
import React, { useEffect, useMemo } from "react";
import type {
  UpdateSignalTypes,
  UpdateSignal,
  ConsumeUpdate,
} from "@/app/spaces/message-types";
import { useSocketStore } from "@/app/spaces/components/SocketStoreProvider";
import { REQUEST_STATUS, SocketActions } from "@/app/store/socket-store";
import { UserInfo } from "@/signaling/ServerTypes";
import { consume } from "@/app/spaces/actions/device-handlers";

export type ConsumerMessageHandlers = Partial<
  Record<UpdateSignalTypes, (message: UpdateSignal) => void | Promise<void>>
>;
export type ConsumerEventHandlers = Record<
  string,
  (consumerId: string) => void
>;
export type ConsumerHandlerCreator = (
  sendRequest: SocketActions["sendRequest"],
  getRequest: SocketActions["getRequest"],
  user: UserInfo
) => ConsumerEventHandlers;

export const createEventHandlers: ConsumerHandlerCreator = (
  sendRequest: SocketActions["sendRequest"],
  getRequest: SocketActions["getRequest"],
  _user: UserInfo
) => ({
  creation: (consumerId: string) => {
    if (!getRequest("resumeConsumer", consumerId)) {
      sendRequest("resumeConsumer", { consumerId }, consumerId);
    }
  },
  trackended: (consumerId: string) => {
    console.log("Track ended", consumerId);
    // USE SOCKET STORE
    // socket!.send(
    //   JSON.stringify({
    //     type: "consumerClosed",
    //     consumerId,
    //     userId: user?.userId,
    //   })
    // );
  },
  transportclose: (consumerId: string) => {
    console.log("Transport closed", consumerId);
    // socket!.send(
    //   JSON.stringify({
    //     type: "consumerClosed",
    //     consumerId,
    //     userId: user?.userId,
    //   })
    // );
  },
  close: (consumerId: string) => {
    console.log("Consumer closed", consumerId);
    // socket!.send(
    //   JSON.stringify({
    //     type: "consumerClosed",
    //     consumerId,
    //     userId: user?.userId,
    //   })
    // );
  },
});
export default function ConsumerManager() {
  const { device, user, activeRoom, addPeerConsumer } = useParticipantStore(
    (state) => state
  );
  const {
    updateRequestState,
    updateHandlers,
    sendRequest,
    getRequest,
    socket,
  } = useSocketStore((state) => state);

  const consumerEventHandlers = useMemo(
    () => createEventHandlers(sendRequest, getRequest, user),
    [sendRequest, getRequest, user]
  );
  const consumerMessageHandlers: ConsumerMessageHandlers = useMemo(
    () => ({
      consumeUpdate: async (message) => {
        const { success, contents } = message as ConsumeUpdate;

        const { id, info, kind, rtpParameters, producer } = contents;
        if (!success) {
          toaster.error({
            title: "Error creating consumer",
            description: "Check the server logs for more information.",
          });
          updateRequestState("consume", producer.id, {
            status: REQUEST_STATUS.FAILURE,
            info,
          });
          return;
        }
        updateRequestState("consume", producer.id, {
          status: REQUEST_STATUS.SUCCESS,
          info,
        });
        // TODO: standardize AppData types
        const { appData, id: producerId } = producer;
        const { ok, consumer, error } = await consume(
          activeRoom.consumerTransport!,
          consumerEventHandlers,
          {
            streamId: appData.userId as string,
            id,
            producerId,
            kind,
            rtpParameters,
          }
        );
        if (ok && consumer) {
          addPeerConsumer(appData.userId as string, consumer);
        } else {
          toaster.error({
            title: "Error creating consumer",
            description: error ?? "Something went wrong.",
          });
        }
      },
    }),
    [
      activeRoom.consumerTransport,
      addPeerConsumer,
      consumerEventHandlers,
      updateRequestState,
    ]
  );

  useEffect(() => {
    if (device && user && activeRoom.id)
      updateHandlers(consumerMessageHandlers);
  }, [activeRoom.id, device, consumerMessageHandlers, updateHandlers, user]);
  return <></>;
}
