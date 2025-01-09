"use client";
import { generateSlug } from "random-word-slugs";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { toaster } from "@/app/components/ui/toaster";
import React, { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import type {
  UpdateSignalTypes,
  UpdateSignal,
  UserIdUpdate,
} from "@/app/spaces/message-types";
import { useSocketStore } from "@/app/spaces/components/SocketStoreProvider";

export type PeerMessageHandlers = Partial<
  Record<UpdateSignalTypes, (message: UpdateSignal) => void | Promise<void>>
>;

export default function PeerManager() {
  const { updateUserInfo, device, activeRoom } = useParticipantStore(
    (state) => state
  );
  const { updateHandlers } = useSocketStore((state) => state);
  const { data: session } = useSession();
  const peerMessageHandlers: PeerMessageHandlers = useMemo(
    () => ({
      userIdUpdate: (message) => {
        const { success, contents } = message as UserIdUpdate;
        if (!success) {
          toaster.error({
            title: "Error getting user ID",
            description:
              "The server wasn't able to get your user ID set up. Check the server logs for more information.",
          });
          return;
        }
        if (!!session?.user)
          updateUserInfo({
            userId: session.user.id!,
            authStatus: "authenticated",
            displayName: session.user.name!,
          });
        else {
          console.log(contents.userId);
          updateUserInfo({
            userId: contents.userId as string,
            authStatus: "unauthenticated",
            displayName: generateSlug(2, { format: "title" }),
          });
        }
      },
    }),
    [session?.user, updateUserInfo]
  );
  useEffect(() => {
    if (device) updateHandlers(peerMessageHandlers);
  }, [activeRoom.id, device, peerMessageHandlers, updateHandlers]);
  return <></>;
}
