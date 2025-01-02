"use client";

import { toaster } from "@/app/components/ui/toaster";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { Device } from "mediasoup-client";
import { useEffect } from "react";

export default function DeviceManager() {
  const { createDevice } = useParticipantStore((state) => state);
  useEffect(() => {
    try {
      createDevice(new Device());
    } catch (e) {
      toaster.error({
        title: "Error creating device",
        description:
          "We couldn't create your device. Please refresh and try again!",
      });
      console.log(e);
    }
  }, [createDevice]);
  return <></>;
}
