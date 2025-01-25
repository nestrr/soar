"use client";
import { Heading, Stack } from "@chakra-ui/react";
import Track from "./Track";
import useSWR from "swr";
import { useState } from "react";
import PaginationButtons from "../common/PaginationButtons";
import NoItemsFound from "../common/NoItemsFound";
import LoadingCircle from "../../../ui/loading-circle";
import TabContentContainer from "../common/TabContentContainer";
import { fetcher } from "@/app/lib/fetcher";

export default function TracksList() {
  const [offset, setOffset] = useState(0);
  const { data: tracks, error } = useSWR<
    SpotifyApi.UsersSavedTracksResponse,
    Error
  >(`/api/liked-songs?offset=${offset}`, fetcher);

  function renderItems() {
    if (error)
      return (
        <Heading as="h2" fontSize="2xl">
          Failed to load.
        </Heading>
      );
    if (!tracks) return <LoadingCircle />;
    if (tracks.items.length)
      return (
        <Stack
          justifyContent={"space-between"}
          h="90%"
          pb={2}
          colorPalette={"fg"}
        >
          <Stack gap={3}>
            {tracks.items.map(({ track }) => {
              const trackProp = {
                id: track.id,
                type: track.type,
                name: track.name,
                duration: track.duration_ms,
                webUrl: track.external_urls.spotify,
                artists: track.artists.map(({ name, external_urls }) => ({
                  name,
                  webUrl: external_urls.spotify,
                })),
                album: {
                  name: track.album.name,
                  webUrl: track.album.external_urls.spotify,
                },
                images: track.album.images,
              };
              return <Track track={trackProp} key={track.id} />;
            })}
          </Stack>
          <PaginationButtons
            adjustOffset={(number) => setOffset((o) => o + number)}
            limit={tracks.limit}
            previous={tracks.previous}
            next={tracks.next}
          />
        </Stack>
      );

    return (
      <NoItemsFound prompt="Save a song to your Liked Songs playlist through your Spotify app or the Spotify website, then come back here and refresh the page!" />
    );
  }
  return <TabContentContainer>{renderItems()}</TabContentContainer>;
}
