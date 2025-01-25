import {
  IconButton,
  Link as ChakraLink,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { LuBadgeInfo, LuMusic } from "react-icons/lu";
import NextLink from "next/link";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Avatar } from "@/app/components/ui/avatar";
import SingleItemContainer from "../common/SingleItemContainer";
import PropagationBoundary from "../../../ui/propagation-boundary";
import { type Playlist as PlaylistType } from "../types";
function AdditionalPlaylistInfo({ playlist }: { playlist: PlaylistType }) {
  const { tracksCount } = playlist;
  return (
    <PropagationBoundary>
      <PopoverRoot
        size="xs"
        positioning={{ offset: { crossAxis: 1, mainAxis: 1 } }}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label="More information on playlist"
            colorPalette={"accent"}
            variant="outline"
            rounded="full"
          >
            {" "}
            <LuBadgeInfo fontSize="18px" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent
          width="fit-content"
          css={{ "--popover-bg": "colors.accent.muted" }}
        >
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Text as={"h4"} fontWeight="medium">
                {tracksCount} songs
              </Text>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </PropagationBoundary>
  );
}
export default function Playlist({ playlist }: { playlist: PlaylistType }) {
  const { name, images, webUrl } = playlist;
  return (
    <SingleItemContainer id={playlist.id} type={playlist.type}>
      <Avatar
        name={`{name} - playlist image`}
        fallback={<LuMusic />}
        src={images.length ? images[0].url : ""}
        shape="rounded"
        size="lg"
      />
      <ChakraLink as="h3">
        <NextLink href={webUrl} target="_blank">
          {name}
        </NextLink>
      </ChakraLink>
      <Flex marginLeft="auto" direction="row" gap={3} alignItems={"center"}>
        <AdditionalPlaylistInfo playlist={playlist} />
      </Flex>
    </SingleItemContainer>
  );
}
