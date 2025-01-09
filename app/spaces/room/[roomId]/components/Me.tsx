"use client";

import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { useEffect, useRef } from "react";

export default function Me() {
  const { activeRoom } = useParticipantStore((state) => state);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (activeRoom.stream) {
      video.current.srcObject = activeRoom.stream;
      video.current.onloadedmetadata = (_e) => {
        video.current.play();
      };
    }
  }, [activeRoom.stream]);

  return (
    <div>
      <video autoPlay ref={video} muted playsInline />
    </div>
  );
}
