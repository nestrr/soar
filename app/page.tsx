export const dynamic = "force-dynamic";

import { Stack } from "@chakra-ui/react";
import TimeDisplay from "./components/TimeDisplay";
import MenuProvider from "./components/menu-bar/MenuProvider";
import MenuBar from "./components/menu-bar/MenuBar";
import Player from "./components/player/Player";

export default function Home() {
  return (
    <Stack
      width="100%"
      height="100vh"
      alignItems={"center"}
      justifyContent="center"
    >
      <TimeDisplay />
      <Stack position="absolute" bottom="10" right="10" alignItems={"end"}>
        <Player />
        <MenuProvider>
          <MenuBar />
        </MenuProvider>
      </Stack>
    </Stack>
  );
}
