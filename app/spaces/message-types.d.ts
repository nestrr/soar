interface BaseSignalingMessage {
  type: string;
  contents: Record<string, unknown>;
  success: boolean;
}
interface UserIdMessage extends BaseSignalingMessage {
  type: "userIdUpdate";
  contents: {
    userId: string;
    info: string;
  };
}
interface EnterRoomMessage extends BaseSignalingMessage {
  type: "joinRoomUpdate" | "createRoomUpdate";
  contents: {
    routerRtpCapabilities: MediasoupClientTypes.RtpCapabilities;
    roomId: string;
    info: string;
  };
}
interface WebRtcTransportsMessage extends BaseSignalingMessage {
  type: "createWebRtcTransportsUpdate";
  contents: {
    producerTransportOptions: MediasoupClientTypes.TransportOptions;
    consumerTransportOptions: MediasoupClientTypes.TransportOptions;
    info: string;
  };
}
interface ProduceMessage extends BaseSignalingMessage {
  type: "produceUpdate";
  contents: {
    producerId: string;
    producerTransportId: string;
    info: string;
  };
}
export type Signal =
  | UserIdMessage
  | EnterRoomMessage
  | WebRtcTransportsMessage
  | ProduceMessage;
export type MessageTypes = Pick<Signal, "type">["type"];
