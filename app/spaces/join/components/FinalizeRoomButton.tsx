import { Button } from "@/app/components/ui/button";
import { useSocketStore } from "@/app/spaces/components/SocketStoreProvider";
import { redirect } from "next/navigation";

export default function FinalizeRoomButton({ roomId }: { roomId: string }) {
  const { sendRequest, getRequest } = useSocketStore((state) => state);
  function finalizeRoom() {
    if (!getRequest("createRoom", roomId)) {
      // TODO: differentiate request type based on room join vs. room creation
      sendRequest("createRoom", { roomId }, roomId);
      redirect(`/spaces/room/${roomId}`);
    }
  }
  return (
    <Button colorPalette="accent" color="fg.emphasized" onClick={finalizeRoom}>
      Let&apos;s go!
    </Button>
  );
}
