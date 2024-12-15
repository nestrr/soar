import {
  IconButton,
  Link as ChakraLink,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { LuBadgeInfo, LuCircleArrowOutUpRight, LuMusic } from "react-icons/lu";
import NextLink from "next/link";
import dayjs from "dayjs";
import dayjsDurationPlugin from "dayjs/plugin/duration";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import SingleItemContainer from "../common/SingleItemContainer";
import { type Track as TrackType } from "../types";
import PropagationBoundary from "../../../ui/propagation-boundary";
import { Avatar } from "../../../ui/avatar";

dayjs.extend(dayjsDurationPlugin);
export function AdditionalTrackInfo({ track }: { track: TrackType }) {
  const { artists, album } = track;
  return (
    <PropagationBoundary>
      <PopoverRoot
        size="xs"
        positioning={{ offset: { crossAxis: 1, mainAxis: 1 } }}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label="More information on track"
            rounded="full"
            colorPalette={"accent"}
            variant="outline"
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
              <Text as={"h4"} fontWeight={"medium"}>
                Album
              </Text>
              <ChakraLink as="h3">
                {" "}
                <LuCircleArrowOutUpRight />
                <NextLink href={album.webUrl} target="_blank">
                  {album.name}
                </NextLink>
              </ChakraLink>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </PropagationBoundary>
  );
}
export default function Track({ track }: { track: TrackType }) {
  const { id, type, name, duration, webUrl, images } = track;
  const format = duration < 60_000_000 ? "mm:ss" : "HH:mm:ss"; // only format with hours if content is at least 1 hour long
  return (
    <SingleItemContainer id={id} type={type}>
      {" "}
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
        <Text marginLeft="auto">{dayjs.duration(duration).format(format)}</Text>
        <AdditionalTrackInfo track={track} />
      </Flex>
    </SingleItemContainer>
  );
}
