"use server";
import { DialogCloseTrigger, IconButton, Tabs } from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { LuMusic, LuX } from "react-icons/lu";
import LogoutButton from "./tabs/LogoutButton";
import TracksList from "./tabs/TracksList";
import PlaylistsList from "./tabs/PlaylistsList";
import AlbumsList from "./tabs/AlbumsList";
import Profile from "./tabs/Profile";

function SpotifySummary() {
  return (
    <Tabs.Root
      lazyMount
      unmountOnExit
      defaultValue="albums"
      variant="outline"
      colorPalette={"bg"}
      borderColor="accent.contrast"
      display="flex"
      flexDirection={"column"}
      minHeight={"100%"}
      minWidth={"100%"}
    >
      <Tabs.List borderColor="accent.contrast">
        <Tabs.Trigger value="albums">Albums</Tabs.Trigger>
        <Tabs.Trigger value="playlists">Playlists</Tabs.Trigger>
        <Tabs.Trigger value="saved">Liked Songs</Tabs.Trigger>
        <Tabs.Trigger value="profile">Spotify Profile</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="albums" pt={0} height={"100%"}>
        <AlbumsList />
      </Tabs.Content>
      <Tabs.Content value="playlists" pt={0} height={"100%"}>
        <PlaylistsList />
      </Tabs.Content>
      <Tabs.Content value="saved" pt={0} height={"100%"}>
        <TracksList />
      </Tabs.Content>
      <Tabs.Content value="profile" pt={0} height={"100%"}>
        <Profile>
          <LogoutButton />
        </Profile>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default async function SpotifyDialog() {
  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <IconButton
          colorPalette="accent"
          color="fg.contrast"
          variant="solid"
          aria-label="Listen to music"
          size="sm"
          p={2}
          rounded="full"
        >
          <LuMusic />
        </IconButton>
      </DialogTrigger>

      <DialogContent
        minHeight="80%"
        lgDown={{ minHeight: "100%", minWidth: "100%" }}
        bg="accent.muted"
        color="fg"
      >
        <DialogHeader
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <DialogTitle>My Music</DialogTitle>
          <DialogCloseTrigger asChild>
            <IconButton
              aria-label="Close Dialog"
              size="xs"
              rounded="md"
              variant="subtle"
              colorPalette={"accent"}
            >
              <LuX strokeWidth={4} />
            </IconButton>
          </DialogCloseTrigger>
        </DialogHeader>
        <DialogBody display="flex" px={6} py={2}>
          <SpotifySummary />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
