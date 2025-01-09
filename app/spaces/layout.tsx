import { ParticipantStoreProvider } from "@/app/spaces/components/ParticipantStoreProvider";
import WebSocketManager from "@/app/spaces/components/WebSocketManager";
import DeviceManager from "@/app/spaces/components/DeviceManager";
import { auth } from "@/auth";
import { SocketStoreProvider } from "@/app/spaces/components/SocketStoreProvider";

export default async function SpacesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SocketStoreProvider>
      <ParticipantStoreProvider>
        <DeviceManager />
        <WebSocketManager accessToken={session?.accessToken} />

        {children}
      </ParticipantStoreProvider>
    </SocketStoreProvider>
  );
}
