import { signIn } from "@/auth";
import { IconButton } from "@chakra-ui/react";
import { LuMusic } from "react-icons/lu";

export default async function MusicLoginButton() {
  const formAction = async () => {
    "use server";
    await signIn("spotify");
  };
  return (
    <form action={formAction}>
      <IconButton
        aria-label="Listen to music"
        size="sm"
        colorPalette="accent"
        color="fg.contrast"
        variant="solid"
        p={2}
        rounded="full"
        type="submit"
      >
        <LuMusic />
      </IconButton>
    </form>
  );
}
