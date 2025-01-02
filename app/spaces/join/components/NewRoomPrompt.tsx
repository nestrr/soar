"use client";
import { IconButton } from "@chakra-ui/react/button";
import {
  Container,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { LuRefreshCcw, LuSendHorizontal } from "react-icons/lu";
import { Button } from "@/app/components/ui/button";
import { generateSlug } from "random-word-slugs";
import { useEffect, useRef, useState } from "react";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function NewRoom({
  toggleScreens,
}: {
  toggleScreens: () => void;
}) {
  const { socket } = useParticipantStore((state) => state);
  const [roomId, setRoomId] = useState("");
  const sent = useRef(false);
  function finalizeRoom() {
    // Socket is definitely ready, because button is disabled otherwise.
    //
    if (!sent.current) {
      socket!.send(JSON.stringify({ type: "createRoom", roomId }));
      sent.current = true;
      redirect(`/spaces/room${roomId}`);
    }
  }
  useEffect(() => {
    setRoomId(generateSlug(3));
    if (socket && socket.readyState !== 1) socket.reconnect();
  }, [socket]);
  return (
    <>
      <Text fontSize="xl" fontWeight="bold" lineHeight={"moderate"}>
        How does this room sound?
      </Text>
      <Text>
        You&apos;ll use this ID to join the room and share it with others.
      </Text>
      <Container
        bg="bg"
        color="fg"
        py={2}
        px={3}
        width="90%"
        mdToLg={{ width: "60%" }}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        rounded="md"
      >
        <Text>{roomId}</Text>
        <HStack gap={3}>
          <IconButton
            size="sm"
            onClick={() => setRoomId(generateSlug(3))}
            aria-label="I don't like this room ID. Generate a new one."
          >
            <LuRefreshCcw />
          </IconButton>
          <Button
            colorPalette="accent"
            color="fg.emphasized"
            onClick={finalizeRoom}
          >
            Let&apos;s go!
          </Button>
        </HStack>
      </Container>

      <Button mt={3} onClick={toggleScreens}>
        I already have a room ID
      </Button>
    </>
  );
}
