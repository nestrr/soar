import { types as MediasoupClientTypes } from "mediasoup-client";
import type { TransportHandlers } from "@/app/spaces/components/WebSocketProvider";
import type { Except } from "type-fest";
export type TransportConnectionEventHandlers = Partial<
  Record<
    MediasoupClientTypes.ConnectionState,
    (transport: MediasoupClientTypes.Transport) => void
  >
>;
export type ConnectionEventHandlers = {
  producerTransport: TransportConnectionEventHandlers;
  consumerTransport: TransportConnectionEventHandlers;
};

const transportConnectionEventHandlers: TransportConnectionEventHandlers = {
  connecting: (transport: MediasoupClientTypes.Transport) => {
    console.log("Producer Transport connecting...", {
      id: transport.id,
    });
  },
  connected: (transport: MediasoupClientTypes.Transport) => {
    console.log("Producer Transport connected", {
      id: transport.id,
    });
  },
  disconnected: (transport: MediasoupClientTypes.Transport) => {
    console.log("Producer Transport disconnected", {
      id: transport.id,
    });
  },
  failed: (transport: MediasoupClientTypes.Transport) => {
    console.warn("Producer Transport failed", {
      id: transport.id,
    });
    transport.close();
  },
} as const;

export async function loadDevice(
  device: MediasoupClientTypes.Device,
  routerRtpCapabilities: MediasoupClientTypes.RtpCapabilities
) {
  try {
    await device.load({
      routerRtpCapabilities: routerRtpCapabilities,
    });
    console.log("Device loaded", device);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
export function createSendTransport(
  device: MediasoupClientTypes.Device,
  transportOptions: MediasoupClientTypes.TransportOptions,
  additionalHandlers: TransportHandlers
) {
  const producerTransport = device.createSendTransport(transportOptions);

  console.info("07.4 producerTransportData ---->", {
    producerTransportId: producerTransport.id,
    producerTransportData: transportOptions,
  });

  producerTransport.on("connect", ({ dtlsParameters }, callback, errback) => {
    additionalHandlers.connect(
      producerTransport.id,
      dtlsParameters,
      callback,
      errback
    );
  });

  producerTransport.on(
    "produce",
    async ({ kind, appData, rtpParameters }, callback, errback) => {
      additionalHandlers.produce(
        producerTransport.id,
        { kind, appData, rtpParameters },
        callback,
        errback
      );
    }
  );

  producerTransport.on(
    "connectionstatechange",
    (state: MediasoupClientTypes.ConnectionState) => {
      additionalHandlers.connectionstatechange(state, producerTransport);
      transportConnectionEventHandlers[state]?.(producerTransport);
    }
  );

  producerTransport.on("icegatheringstatechange", (state) => {
    console.log("Producer icegatheringstatechange", {
      state: state,
      id: producerTransport.id,
    });
  });
}

export function createRecvTransport(
  device: MediasoupClientTypes.Device,
  transportOptions: MediasoupClientTypes.TransportOptions,
  additionalHandlers: Except<TransportHandlers, "produce">
) {
  const consumerTransport = device.createRecvTransport(transportOptions);
  consumerTransport.on("connect", ({ dtlsParameters }, callback, errback) => {
    additionalHandlers.connect(
      consumerTransport.id,
      dtlsParameters,
      callback,
      errback
    );
  });

  consumerTransport.on(
    "connectionstatechange",
    (state: MediasoupClientTypes.ConnectionState) => {
      additionalHandlers.connectionstatechange(state, consumerTransport);
      transportConnectionEventHandlers[state]?.(consumerTransport);
    }
  );

  consumerTransport.on("icegatheringstatechange", (state) => {
    console.log("Consumer icegatheringstatechange", {
      state: state,
      id: consumerTransport.id,
    });
  });
}

export async function produce(device: MediasoupClientTypes.Device) {
  if (!device.canProduce("video") && !device.canProduce("audio")) {
    console.error("Device can't produce audio or video");
    return { ok: false, error: "Your devices can't produce audio or video." };
  }
  try {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    return { ok: true };
  } catch (e) {
    console.log("Error getting user media", e);
    return { ok: false, error: "We couldn't get your camera and mic." };
  }
}
export async function hasGrantedPermissions() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.some((device) => device.label !== "");
}
