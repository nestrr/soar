interface BaseRequestSignal {
  type: string;
}
interface CreateRoomRequest extends BaseRequestSignal {
  type: "createRoom";
  roomId: string;
}
interface JoinRoomRequest extends BaseRequestSignal {
  type: "joinRoom";
  roomId: string;
}
interface CreateWebRtcTransportsRequest extends BaseRequestSignal {
  type: "createWebRtcTransports";
  roomId: string;
  rtpCapabilities: MediasoupClientTypes.RtpCapabilities;
}
interface ConnectTransportRequest extends BaseRequestSignal {
  type: "connectTransport";
  transportId: string;
  dtlsParameters: MediasoupClientTypes.DtlsParameters;
  roomId: string;
}
interface ProduceRequest extends BaseRequestSignal {
  type: "produce";
  producerTransportId: string;
  roomId: string;
  kind: string;
  appData: Record<string, unknown>;
  rtpParameters: MediasoupClientTypes.RtpParameters;
}
export type RequestSignal =
  | CreateRoomRequest
  | JoinRoomRequest
  | CreateWebRtcTransportsRequest
  | ConnectTransportRequest
  | ProduceRequest;
export type RequestSignalTypes = Pick<RequestSignal, "type">["type"];
interface BaseUpdateSignal {
  type: string;
  contents: Record<string, unknown>;
  success: boolean;
}
interface UserIdUpdate extends BaseUpdateSignal {
  type: "userIdUpdate";
  contents: {
    userId: string;
    info: string;
  };
}
interface EnterRoomUpdate extends BaseUpdateSignal {
  type: "joinRoomUpdate" | "createRoomUpdate";
  contents: {
    routerRtpCapabilities: MediasoupClientTypes.RtpCapabilities;
    roomId: string;
    info: string;
  };
}
interface WebRtcTransportsUpdate extends BaseUpdateSignal {
  type: "createWebRtcTransportsUpdate";
  contents: {
    producerTransportOptions: MediasoupClientTypes.TransportOptions;
    consumerTransportOptions: MediasoupClientTypes.TransportOptions;
    roomId: string;
    info: string;
  };
}
interface ProduceUpdate extends BaseUpdateSignal {
  type: "produceUpdate";
  contents: {
    producerId: string;
    producerTransportId: string;
    info: string;
    deviceLabel: string;
    kind: string;
    // TODO: sync with appData
  };
}
interface ProducerClosedUpdate extends BaseUpdateSignal {
  type: "producerClosedUpdate";
  contents: {
    producerId: string;
    info: string;
  };
}
interface ConnectTransportUpdate extends BaseUpdateSignal {
  type: "connectTransportUpdate";
  contents: {
    transportId: string;
    info: string;
  };
}
export type UpdateSignal =
  | UserIdUpdate
  | EnterRoomUpdate
  | WebRtcTransportsUpdate
  | ProduceUpdate
  | ProducerClosedUpdate
  | ConnectTransportUpdate;
export type UpdateSignalTypes = Pick<UpdateSignal, "type">["type"];
