"use client";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { IconButton } from "@chakra-ui/react/button";
import { Text } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RoomJoinDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setDialogOpen(pathname.split("/")[2] === "join");
  }, [pathname]);

  return (
    <>
      <DialogRoot placement="center" size="xl" open={dialogOpen}>
        {/* <DialogTrigger asChild>
            <Link href="/spaces/join">Join a Space</Link>
          </DialogTrigger> */}
        <DialogContent
          minHeight="60%"
          lgDown={{ minHeight: "100%", minWidth: "100%" }}
          bg="accent.muted"
          color="fg"
          p={2}
        >
          <DialogHeader
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <DialogTitle>
              <Text fontSize="3xl">Let&apos;s get you joined in!</Text>
            </DialogTitle>
            <DialogCloseTrigger>
              <Link href="/">
                <IconButton
                  aria-label="Leave"
                  size="xs"
                  rounded="md"
                  variant="subtle"
                  colorPalette={"accent"}
                  asChild
                >
                  <LuX strokeWidth={4} />
                </IconButton>
              </Link>
            </DialogCloseTrigger>
          </DialogHeader>
          <DialogBody display="flex" px={6} pb={4}>
            {children}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
}
