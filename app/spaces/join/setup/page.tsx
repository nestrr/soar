import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParticipantStore } from "@/app/spaces/components/ParticipantStoreProvider";
import { produce } from "@/app/spaces/actions/device-handlers";
export default function SetupPrompt() {
  const { device } = useParticipantStore((state) => state);
  useEffect(() => {
    if (device) {
      const produceMedia = async () => {
        await produce(device);
      };
      produceMedia();
    }
  }, [device]);
  return (
    <>
      <Text fontSize="xl" fontWeight="bold" lineHeight={"moderate"}>
        Can we use your camera and mic? (Please?)
      </Text>
      <Text width="90%">
        We&apos;ll need to access your camera and mic so your study buddies can
        see and hear you. Don&apos;t worry, you&apos;ll be able to turn either
        off or on at any time.
      </Text>
    </>
  );
}
