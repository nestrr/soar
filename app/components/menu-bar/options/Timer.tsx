import { IconButton } from "@chakra-ui/react";
import { LuAlarmClock } from "react-icons/lu";
import { Tooltip } from "@/app/components/ui/tooltip";
export default function Timer() {
  return (
    <Tooltip
      content=" Timer "
      openDelay={0}
      positioning={{
        placement: "top",
        offset: { mainAxis: 2, crossAxis: 0 },
      }}
    >
      <IconButton
        colorPalette="accent"
        color="fg.contrast"
        variant="solid"
        aria-label="Set a timer"
        size="sm"
        p={2}
        rounded="full"
      >
        <LuAlarmClock />
      </IconButton>
    </Tooltip>
  );
}
