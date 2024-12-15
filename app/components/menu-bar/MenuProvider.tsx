"use client";

import {
  IconButton,
  ActionBarRoot,
  ActionBarContent,
  ActionBarSeparator,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuEyeOff, LuGripVertical } from "react-icons/lu";
import { Tooltip } from "../ui/tooltip";
import React from "react";

export default function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      {!menuVisible && (
        <Tooltip
          content="Show Menu "
          openDelay={0}
          positioning={{
            placement: "top",
            offset: { mainAxis: 2, crossAxis: 0 },
          }}
        >
          <IconButton
            aria-label="Show menu"
            onClick={(e) => setMenuVisible(true)}
            rounded="full"
            colorPalette="accent"
            color="fg.contrast"
            variant="solid"
            w={4}
          >
            <LuGripVertical />
          </IconButton>
        </Tooltip>
      )}
      {menuVisible && (
        <ActionBarRoot
          open={menuVisible}
          onOpenChange={(e) => setMenuVisible((v: boolean) => !v)}
          closeOnInteractOutside={false}
        >
          <ActionBarContent bg="accent.muted" p={2} rounded="full">
            {children}
            <ActionBarSeparator />
            <Tooltip
              content=" Hide "
              openDelay={0}
              positioning={{
                placement: "top",
                offset: { mainAxis: 2, crossAxis: 0 },
              }}
            >
              <IconButton
                aria-label="Close menu"
                size="sm"
                p={2}
                colorPalette="accent"
                color="fg.contrast"
                variant="solid"
                rounded="full"
                onClick={(e) => setMenuVisible(false)}
              >
                <LuEyeOff />
              </IconButton>
            </Tooltip>
          </ActionBarContent>
        </ActionBarRoot>
      )}
    </>
  );
}
