"use client";
import { useState } from "react";
import NewRoom from "@/app/spaces/join/components/NewRoomPrompt";
import ExistingRoom from "@/app/spaces/join/components/ExistingRoomPrompt";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";

export default function DialogScreens() {
  const { activeRoom } = useParticipantStore((state) => state);
  const [needsNewRoom, setNeedsNewRoom] = useState(true);
  const toggleScreens = () => {
    setNeedsNewRoom((n) => !n);
  };
  function renderStages() {
    if (!activeRoom) {
      return needsNewRoom ? (
        <NewRoom toggleScreens={toggleScreens} />
      ) : (
        <ExistingRoom toggleScreens={toggleScreens} />
      );
    }
    return <></>;
  }
  return <>{renderStages()}</>;
}
