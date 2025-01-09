"use client";
import { produce } from "@/app/spaces/actions/device-handlers";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import type { ProducerEventHandlers } from "@/app/spaces/join/setup/page";
import Me from "@/app/spaces/room/[roomId]/components/Me";
import PermissionsPrompt from "@/app/spaces/room/[roomId]/components/PermissionsPrompt";
import { useEffect, useMemo, useRef } from "react";

export default function RoomPage() {
  const sentProduce = useRef(false);
  const { device, activeRoom, updateRoomInfo } = useParticipantStore(
    (state) => state
  );
  const producerEventHandlers: ProducerEventHandlers = useMemo(
    () => ({
      trackended: (producerId) => {
        console.log("Track ended", producerId);
        // USE SOCKET STORE
        // socket!.send(
        //   JSON.stringify({
        //     type: "producerClosed",
        //     producerId,
        //     userId: user?.userId,
        //   })
        // );
      },
      transportclose: (producerId) => {
        console.log("Transport closed", producerId);
        // socket!.send(
        //   JSON.stringify({
        //     type: "producerClosed",
        //     producerId,
        //     userId: user?.userId,
        //   })
        // );
      },
      close: (producerId) => {
        console.log("Producer closed", producerId);
        // socket!.send(
        //   JSON.stringify({
        //     type: "producerClosed",
        //     producerId,
        //     userId: user?.userId,
        //   })
        // );
      },
    }),
    []
  );
  useEffect(() => {
    const produceMedia = async () => {
      sentProduce.current = true;
      const { ok, error, producers } = await produce(
        device!,
        activeRoom.producerTransport!,
        producerEventHandlers
      );
      if (!ok) {
        console.error("Error producing", error);
      } else if (activeRoom.stream) {
        updateRoomInfo({
          producers,
        });
      }
    };
    if (device && activeRoom.producerTransport && !sentProduce.current)
      produceMedia();
  }, [
    activeRoom.producerTransport,
    device,
    activeRoom.stream,
    producerEventHandlers,
    updateRoomInfo,
  ]);
  return (
    <div>
      <PermissionsPrompt />
      In construction
      <Me />
    </div>
  );
}
