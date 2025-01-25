import { Container, type ContainerProps } from "@chakra-ui/react/container";
import {
  DotLottieReact,
  type DotLottieReactProps,
} from "@lottiefiles/dotlottie-react";
export function Animation({
  source,
  containerProps,
  dotLottieProps,
}: {
  source: string;
  containerProps?: ContainerProps;
  dotLottieProps?: DotLottieReactProps;
}) {
  return (
    <Container
      py={0}
      lgDown={{ display: "none" }}
      width="50%"
      {...containerProps}
    >
      <DotLottieReact src={source} loop autoplay {...dotLottieProps} />
    </Container>
  );
}
