"use client";
import { Button } from "@/app/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { toaster } from "@/app/components/ui/toaster";
import { HStack, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react/typography";
import { usePathname } from "next/navigation";
import { LuCircleHelp, LuX } from "react-icons/lu";
export default function SpacesHelp() {
  const pathname = usePathname();
  const inviteLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${pathname}`;
  function copyToClipboard(link: string) {
    navigator.clipboard.writeText(link).then(() => {
      toaster.success({
        title: "Copied invite link!",
      });
    });
  }
  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <IconButton
          asChild
          colorPalette="accent"
          color="fg"
          variant="surface"
          aria-label="Listen to music"
          size="2xs"
          p={0.5}
          rounded="full"
          position="absolute"
          top={7}
          right={10}
        >
          <LuCircleHelp />
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
          <DialogTitle fontSize="3xl">Welcome to Spaces.</DialogTitle>
          <DialogCloseTrigger asChild>
            <IconButton
              asChild
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
        <DialogBody display="flex" flexDir="column" gap={3}>
          <Text>
            Work is easier when done together. Here, you can chat with other
            people in this room and see each other hard at work!
          </Text>
          <Stack as="section">
            <Heading as="h2">Can others see me?</Heading>
            <Text>
              Only if you let them! Turn on your camera to let others see you
              hard at work.
            </Text>
          </Stack>
          <Stack as="section">
            <Heading as="h2">How do I share this space with others?</Heading>
            <Text>
              Click the link icon at the top right of the page to copy the
              invite link to your keyboard! Or, use the link below.
            </Text>
            <HStack>
              <Input
                defaultValue={inviteLink}
                readOnly
                color="accent.contrast"
              />
              <Button
                colorPalette="accent"
                color="fg.contrast"
                onClick={() => copyToClipboard(inviteLink)}
              >
                Copy
              </Button>
            </HStack>
          </Stack>
          <Stack as="section">
            <Heading as="h2">
              How do I mute chat notifications or stop seeing people&apos;s
              cameras?
            </Heading>
            <Text>
              At the top right of the page, click the bell icon to mute chat
              notifications, or click the closed-eye icon to stop seeing
              others&apos; camera feeds.
            </Text>
          </Stack>
          <Stack as="section">
            <Heading as="h2">How do I leave a space?</Heading>
            <Text>At the bottom right of a page, click the exit button.</Text>
          </Stack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
