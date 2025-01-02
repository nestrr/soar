import { Button } from "@/app/components/ui/button";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FinalizeRoomButton({ roomId }: { roomId: string }) {
  const { socket } = useParticipantStore((state) => state);
  const sent = useRef(false);
  useEffect(() => {
    if (socket && socket.readyState !== 1) socket.reconnect();
  }, [socket]);
  function finalizeRoom() {
    // Socket is definitely ready, because button is disabled otherwise.
    //
    if (!sent.current) {
      socket!.send(JSON.stringify({ type: "createRoom", roomId }));
      sent.current = true;
      redirect(`/spaces/room/${roomId}`);
    }
  }
  return (
    <Button colorPalette="accent" color="fg.emphasized" onClick={finalizeRoom}>
      Let&apos;s go!
    </Button>
  );
}
