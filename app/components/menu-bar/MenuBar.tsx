"use server";
import Chat from "./options/Chat";
import Timer from "./options/Timer";
import Music from "./options/Music";
import { ColorModeButton } from "../ui/color-mode";
export default async function MenuBar() {
  return (
    <>
      <ColorModeButton rounded="full" />
      <Chat />
      <Timer />
      <Music />
    </>
  );
}
