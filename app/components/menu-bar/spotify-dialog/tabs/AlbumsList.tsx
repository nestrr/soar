"use client";
import { Heading, Stack } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";
import PaginationButtons from "../common/PaginationButtons";
import NoItemsFound from "../common/NoItemsFound";
import Album from "./Album";
import LoadingCircle from "../../../ui/loading-circle";
import TabContentContainer from "../common/TabContentContainer";
import { fetcher } from "@/app/lib/fetcher";

export default function AlbumsList() {
  const [offset, setOffset] = useState(0);
  const { data: albums, error } = useSWR<
    SpotifyApi.UsersSavedAlbumsResponse,
    Error
  >(`/api/saved-albums?offset=${offset}`, fetcher);
  function renderItems() {
    if (error)
      return (
        <Heading as="h2" fontSize="2xl">
          Failed to load.
        </Heading>
      );
    if (!albums) return <LoadingCircle />;
    if (albums.items.length)
      return (
        <Stack justifyContent={"space-between"} h="90%" py={2}>
          <Stack gap={3}>
            {albums.items.map(({ album }) => {
              const albumProp = {
                id: album.id,
                name: album.name,
                type: album.type,
                webUrl: album.external_urls.spotify,
                artists: album.artists.map(({ name, external_urls }) => ({
                  name,
                  webUrl: external_urls.spotify,
                })),
                images: album.images,
                tracksCount: album.total_tracks,
              };
              return <Album album={albumProp} key={album.id} />;
            })}
          </Stack>
          <PaginationButtons
            adjustOffset={(number) => setOffset((o) => o + number)}
            limit={albums.limit}
            previous={albums.previous}
            next={albums.next}
          />
        </Stack>
      );
    return (
      <NoItemsFound prompt="Save an album through your Spotify app or the Spotify website, then come back here and refresh the page!" />
    );
  }
  return <TabContentContainer>{renderItems()}</TabContentContainer>;
}
