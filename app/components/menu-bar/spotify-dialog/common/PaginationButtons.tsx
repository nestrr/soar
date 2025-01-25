import { HStack, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
interface PaginationProps {
  adjustOffset: (adjustment: number) => void;
  limit: number;
  previous: string | null;
  next: string | null;
}
export default function PaginationButtons({
  adjustOffset,
  limit,
  previous,
  next,
}: PaginationProps) {
  return (
    <HStack justifyContent={"center"} py={3} gap={8}>
      <IconButton
        aria-label="See previous page"
        size="sm"
        rounded="full"
        onClick={(_e) => adjustOffset(-limit)}
        disabled={previous === null}
      >
        <LuChevronLeft />
      </IconButton>
      <IconButton
        aria-label="See next page"
        size="sm"
        rounded="full"
        disabled={next === null}
        onClick={(_e) => adjustOffset(limit)}
      >
        <LuChevronRight />
      </IconButton>
    </HStack>
  );
}
