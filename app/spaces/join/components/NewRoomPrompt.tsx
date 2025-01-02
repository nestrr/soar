"use client";
import { IconButton } from "@chakra-ui/react/button";
import { Container, HStack, Text } from "@chakra-ui/react";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "@/app/components/ui/button";
import { generateSlug } from "random-word-slugs";
import { useEffect, useState } from "react";
import FinalizeRoomButton from "@/app/spaces/join/components/FinalizeRoomButton";
export default function NewRoom({
  toggleScreens,
}: {
  toggleScreens: () => void;
}) {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    setRoomId(generateSlug(3));
  }, []);
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
          <FinalizeRoomButton roomId={roomId} />
        </HStack>
      </Container>

      <Button mt={3} onClick={toggleScreens}>
        I already have a room ID
      </Button>
    </>
  );
}
