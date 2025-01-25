"use client";

import { useEffect, useState, useRef } from "react";
import { usePlayerStore } from "../PlayerStoreProvider";
import { Box, Text } from "@chakra-ui/react";
interface IFrameAPI {
  createController: (...args: unknown[]) => void;
}
interface EmbedController {
  addListener(...args: unknown[]): unknown;
  loadUri: (uri: string) => void;
  iframeElement: HTMLIFrameElement;
  currentUri: string;
  loading: boolean;
  setIframeDimensions: (width: string, height: string | number) => void;
}
interface PlaybackUpdateEvent {
  isPaused: boolean;
  isBuffering: boolean;
  duration: number;
  position: number;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady: (iFrameApi: IFrameAPI) => void;
  }
}
export default function Player() {
  const iframeRef = useRef(null);
  const embedControllerRef = useRef<null | EmbedController>(null);
  const { id, type } = usePlayerStore((state) => state);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!!id && !!type) {
      const uri = `spotify:${type}:${id}`;
      if (
        embedControllerRef.current &&
        !embedControllerRef.current.loading &&
        embedControllerRef.current.currentUri !== uri
      ) {
        console.log(embedControllerRef.current);
        embedControllerRef.current.loadUri(uri);
      }

      window.onSpotifyIframeApiReady = (IFrameAPI: IFrameAPI) => {
        const options = {
          height: "152",
          width: "100%",
          uri,
        };
        const callback = (EmbedController: EmbedController) => {
          if (embedControllerRef.current === null) {
            console.log("loaded for first time");
            EmbedController.loadUri(uri);
            EmbedController.addListener("ready", () => {
              setWaiting(true);
              embedControllerRef.current = EmbedController;
              embedControllerRef.current.iframeElement.style.borderRadius =
                "25px";
              embedControllerRef.current.iframeElement.style.backgroundColor =
                "red";
            });
            EmbedController.addListener(
              "playback_update",
              (e: { data: PlaybackUpdateEvent }) => {
                console.log(e.data);
                if (!e.data.isPaused && waiting) setWaiting(false);
              }
            );
          }
        };
        IFrameAPI.createController(iframeRef.current, options, callback);
      };
    }
  }, [id, type]);

  return !!id && !!type ? (
    <Box>
      <div ref={iframeRef}></div>
    </Box>
  ) : (
    <Text>choose song</Text>
  );
}
