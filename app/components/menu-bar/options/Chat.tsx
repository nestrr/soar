import { IconButton } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";
import { Tooltip } from "@/app/components/ui/tooltip";
// TODO: Refactor so you're not repeating the same JSX for these options over and over
export default function Chat() {
  return (
    <Tooltip
      content="Chat"
      openDelay={0}
      positioning={{
        placement: "top",
        offset: { mainAxis: 2, crossAxis: 0 },
      }}
    >
      <IconButton
        aria-label="Chat"
        colorPalette="accent"
        color="fg.contrast"
        variant="solid"
        size="sm"
        p={2}
        rounded="full"
      >
        <LuMessageCircle />
      </IconButton>
    </Tooltip>
  );
}
