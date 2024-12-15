"use client";
import { Button, Container, VisuallyHidden } from "@chakra-ui/react";
import { usePlayerStore } from "@/app/components/PlayerStoreProvider";
import React from "react";

export default function SingleItemContainer({
  id,
  type,
  children,
}: {
  id: string;
  type: string;
  children: React.ReactNode;
}) {
  const {
    id: currentlyPlayingId,
    setId,
    setType,
  } = usePlayerStore((state) => state);

  return (
    <Container
      p={1}
      as="section"
      alignItems="center"
      display={"flex"}
      gap={3}
      w="100%"
      className="group"
      _hover={{
        bg: "accent.focusRing",
        borderColor: "accent.focusRing",
      }}
      borderColor={
        id === currentlyPlayingId ? "accent.emphasized" : "accent.focusRing"
      }
      bg={id === currentlyPlayingId ? "accent.emphasized" : "accent.muted"}
      borderWidth={"3px"}
      borderRadius={"md"}
      onClick={(e) => {
        setId(id);
        setType(type);
      }}
    >
      <VisuallyHidden>
        <Button aria-label="Select this playlist, album, or track to be played" />
      </VisuallyHidden>
      {children}
    </Container>
  );
}
