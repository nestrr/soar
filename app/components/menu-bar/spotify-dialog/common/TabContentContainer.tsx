import { Container } from "@chakra-ui/react";

export default function TabContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      display="flex"
      flexDir={"column"}
      width="100%"
      h="100%"
      textAlign={"center"}
      justifyContent="center"
      py={3}
    >
      {" "}
      {children}
    </Container>
  );
}
