"use client";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
function Seconds({ seconds }: { seconds: string }) {
  return (
    <Box
      as="span"
      opacity={0}
      display={"inline-block"}
      position={"absolute"}
      left="-9999"
      _groupHover={{
        animationName: "fade-in",
        animationDuration: "800ms",
        opacity: 1,
        position: "unset",
      }}
      colorScheme={"contrast"}
    >
      <Heading size="5xl" color="fg.contrast" suppressHydrationWarning>
        :{seconds}
      </Heading>
    </Box>
  );
}
export default function TimeDisplay() {
  const [time, setTime] = useState(dayjs());
  useEffect(() => {
    // create a interval and get the id
    const myInterval = setInterval(() => {
      setTime((_prevDayjs) => dayjs());
    }, 1000);
    // clear out the interval using the id when unmounting the component
    return () => clearInterval(myInterval);
  }, []);
  return (
    <Heading as="h1" size={"5xl"} suppressHydrationWarning className="group">
      {time.format("hh:mm")}
      <Seconds seconds={time.format("ss")} />
      <span> {time.format("a")}</span>
    </Heading>
  );
}
