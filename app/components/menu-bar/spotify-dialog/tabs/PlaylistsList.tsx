"use client";
import { Heading, Input, Stack } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";
import PaginationButtons from "../common/PaginationButtons";
import Playlist from "./Playlist";
import NoItemsFound from "../common/NoItemsFound";
import LoadingCircle from "../../../ui/loading-circle";
import TabContentContainer from "../common/TabContentContainer";
import { fetcher } from "@/app/lib/fetcher";

export default function PlaylistsList() {
  const [offset, setOffset] = useState(0);

  const { data: playlists, error } = useSWR<
    SpotifyApi.ListOfUsersPlaylistsResponse,
    Error
  >(`/api/saved-playlists?offset=${offset}`, fetcher);

  function renderItems() {
    if (error)
      return (
        <Heading as="h2" fontSize="2xl">
          Failed to load.
        </Heading>
      );
    if (!playlists) return <LoadingCircle />;
    if (playlists.items.length)
      return (
        <Stack
          justifyContent={"space-between"}
          h="90%"
          pb={2}
          colorPalette={"fg"}
        >
          <Stack gap={3}>
            {playlists.items.map(
              ({ id, type, name, external_urls, images, tracks }) => {
                const playlistProp = {
                  id,
                  type,
                  name,
                  webUrl: external_urls.spotify,
                  images,
                  tracksCount: tracks.total,
                };
                return <Playlist playlist={playlistProp} key={id} />;
              }
            )}
          </Stack>
          <PaginationButtons
            adjustOffset={(number) => setOffset((o) => o + number)}
            limit={playlists.limit}
            previous={playlists.previous}
            next={playlists.next}
          />
        </Stack>
      );
    return (
      <NoItemsFound prompt="Save a playlist through your Spotify app or the Spotify website, then come back here and refresh the page!" />
    );
  }

  return <TabContentContainer>{renderItems()}</TabContentContainer>;
}
