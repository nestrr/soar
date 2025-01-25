import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/app/components/ui/progress-circle";
import {
  ProgressCircleCircleProps,
  ProgressCircleRootProps,
} from "@chakra-ui/react";

interface LoadingCircleProps {
  rootProps?: ProgressCircleRootProps;
  ringProps?: ProgressCircleCircleProps;
}
export default function LoadingCircle({
  rootProps,
  ringProps,
}: LoadingCircleProps) {
  return (
    <ProgressCircleRoot
      value={null}
      size="sm"
      {...rootProps}
      alignSelf="center"
    >
      <ProgressCircleRing cap="round" {...ringProps} />
    </ProgressCircleRoot>
  );
}
