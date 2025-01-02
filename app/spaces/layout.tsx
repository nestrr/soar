import { ParticipantStoreProvider } from "@/app/spaces/components/ParticipantStoreProvider";
import WebSocketProvider from "@/app/spaces/components/WebSocketProvider";
import DeviceManager from "@/app/spaces/components/DeviceManager";
import { auth } from "@/auth";

export default async function SpacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <ParticipantStoreProvider>
      <DeviceManager />
      <WebSocketProvider accessToken={session?.accessToken}></WebSocketProvider>

      {children}
    </ParticipantStoreProvider>
  );
}
