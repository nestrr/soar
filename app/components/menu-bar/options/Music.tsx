"use server";
import { Tooltip } from "@/app/components/ui/tooltip";
import { auth } from "@/auth";
import MusicLoginButton from "../MusicLoginButton";
import SpotifyDialog from "../spotify-dialog/SpotifyDialog";
import { IconButton } from "@chakra-ui/react";
import { LuMusic } from "react-icons/lu";
import Link from "next/link";

export default async function Music() {
  const session = await auth();

  const musicButton = !!session ? (
    <span>
      <SpotifyDialog />
    </span>
  ) : (
    // <IconButton aria-label="Listen to music" size="sm" p={2} rounded="full">
    //   <Link href="/music">
    //     {" "}
    //     <LuMusic />
    //   </Link>
    // </IconButton>
    <span>
      {/* span is needed to avoid throwing "Error: React.Children.only expected
      to receive a single React element child" */}
      <MusicLoginButton />
    </span>
  );
  return (
    <Tooltip
      content=" Music "
      openDelay={0}
      positioning={{
        placement: "top",
        offset: { mainAxis: 2, crossAxis: 0 },
      }}
    >
      {musicButton}
    </Tooltip>
  );
}
