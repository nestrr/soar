import {
  IconButton,
  Link as ChakraLink,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { LuBadgeInfo, LuCircleArrowOutUpRight, LuMusic } from "react-icons/lu";
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
import { type Album as AlbumType } from "../types";
function AdditionalAlbumInfo({ album }: { album: AlbumType }) {
  const { tracksCount, artists } = album;
  return (
    <PropagationBoundary>
      <PopoverRoot
        size="xs"
        positioning={{ offset: { crossAxis: 1, mainAxis: 1 } }}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label="More information on album"
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

              <Text as={"h4"} fontWeight="medium">
                Artists
              </Text>
              {artists.map(({ name, webUrl }) => (
                <ChakraLink as="h3" key={webUrl}>
                  <LuCircleArrowOutUpRight />
                  <NextLink href={webUrl} target="_blank">
                    {name}
                  </NextLink>
                </ChakraLink>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </PropagationBoundary>
  );
}
export default function Album({ album }: { album: AlbumType }) {
  const { name, images, webUrl } = album;
  return (
    <SingleItemContainer id={album.id} type={album.type}>
      <Avatar
        name={`{name} - album image`}
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
        <AdditionalAlbumInfo album={album} />
      </Flex>
    </SingleItemContainer>
  );
}
