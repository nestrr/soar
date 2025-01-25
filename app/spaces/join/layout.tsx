import RoomJoinDialog from "@/app/spaces/join/components/RoomJoinDialog";
import React from "react";
import { VStack } from "@chakra-ui/react";

export default function JoinLayout({
  children,
  visual,
}: Readonly<{
  children: React.ReactNode;
  visual: React.ReactNode;
}>) {
  return (
    <RoomJoinDialog>
      {visual}
      <VStack
        width="50%"
        lgDown={{ width: "100%" }}
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={4}
        textAlign={"center"}
      >
        {children}
      </VStack>
    </RoomJoinDialog>
  );
}
