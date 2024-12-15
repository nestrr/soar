import { Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { LuGhost } from "react-icons/lu";

export default function NoItemsFound({ prompt }: { prompt: string }) {
  return (
    <Stack alignItems="center" justifyContent="center" gap={5} p={5}>
      <Icon color="accent.emphasized" fontSize="7xl">
        <LuGhost />
      </Icon>
      <Heading as="h3" fontSize="3xl">
        It&apos;s looking empty in here...{" "}
      </Heading>
      <Text fontSize="lg" textAlign={"center"} lineHeight={"1.5"}>
        {prompt}
      </Text>
    </Stack>
  );
}
