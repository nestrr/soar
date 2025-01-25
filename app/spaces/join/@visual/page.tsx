"use client";
import { Animation } from "@/app/components/Animation";
import { usePathname } from "next/navigation";
export default function JoinVisual() {
  const sources = {
    join: "https://lottie.host/8b1efde6-ec39-4906-834e-45620adaa983/s1qidW9QoK.lottie",
    setup:
      "https://lottie.host/1880e9fc-abb1-425e-bf12-0026e4e65871/bE8ir3mqdy.lottie",
  } as Record<string, string>;
  const paths = usePathname().split("/");
  const source = paths[paths.length - 1];
  return <Animation source={sources[source]} />;
}
