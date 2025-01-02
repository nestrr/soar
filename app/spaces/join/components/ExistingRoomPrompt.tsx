"use client";
import { IconButton } from "@chakra-ui/react/button";
import { Container, Input, Text } from "@chakra-ui/react";
import { LuSendHorizontal } from "react-icons/lu";
import { Button } from "@/app/components/ui/button";
import { Tooltip } from "@/app/components/ui/tooltip";
import { useState } from "react";
export default function ExistingRoom({
  toggleScreens,
}: {
  toggleScreens: () => void;
}) {
  const [roomId, setRoomId] = useState("");

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" lineHeight={"moderate"}>
        What&apos;s your room ID?
      </Text>
      <Text>
        It should consist of three words, like &quot;harsh-spicy-mechanic&quot;.
      </Text>
      <Container
        bg="bg"
        color="fg"
        py={2}
        px={3}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        rounded="md"
      >
        <Input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          width="85%"
          variant="flushed"
          height={"90%"}
          borderBottomWidth="medium"
          placeholder="quick-brown-fox"
        />

        <Tooltip
          content="Ready to go!"
          openDelay={0}
          positioning={{
            placement: "top",
            offset: { mainAxis: 2, crossAxis: 0 },
          }}
        >
          {/**This icon button should also redirect to next page. */}
          <IconButton
            size="sm"
            onClick={() => {
              console.log("going to the room");
            }}
            aria-label="Go to this room"
          >
            <LuSendHorizontal />
          </IconButton>
        </Tooltip>
      </Container>

      <Button mt={3} onClick={toggleScreens}>
        I don&apos;t have a room ID
      </Button>
    </>
  );
}
