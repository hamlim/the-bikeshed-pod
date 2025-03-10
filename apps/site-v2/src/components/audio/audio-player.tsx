"use client";
import { useRef, useState } from "react";
import { StateContext, UpdateContext } from "./audio-context";
import type { AudioStateContext, AudioUpdateContext } from "./audio-context";

export function Provider({ children }: { children: React.ReactNode }) {
  let audioRef = useRef<HTMLAudioElement>(null);

  let [playing, setPlaying] = useState(false);
  let [time, setTime] = useState(0);
  let [volume, setVolume] = useState(1);
  let [speed, setSpeed] = useState(1);
  let [muted, setMuted] = useState(false);
  let [track, setTrack] = useState<{ src: string; captionsSrc: string } | null>(
    null,
  );
  let [duration, setDuration] = useState(0);

  let audioStateContext = {
    playing,
    time,
    volume,
    speed,
    muted,
    duration,
    track,
  } satisfies AudioStateContext;

  let audioUpdateContext = {
    setPlaying(shouldPlay: boolean) {
      setPlaying(shouldPlay);
      if (audioRef.current) {
        if (shouldPlay) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    },
    setTime(time: number) {
      setTime(time);
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
    setVolume(volume: number) {
      setVolume(volume);
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
    },
    setSpeed(speed: number) {
      setSpeed(speed);
      if (audioRef.current) {
        audioRef.current.playbackRate = speed;
      }
    },
    setMuted(muted: boolean) {
      setMuted(muted);
      if (audioRef.current) {
        audioRef.current.muted = muted;
      }
    },
    setTrack,
  } satisfies AudioUpdateContext;

  return (
    <StateContext value={audioStateContext}>
      <UpdateContext value={audioUpdateContext}>
        {children}
        {track ? (
          // biome-ignore lint/a11y/useMediaCaption: <explanation>
          <audio
            ref={audioRef}
            // @TODO: I can't figure out any of this - none of these handlers are being called
            // not sure why that is though.
            preload="metadata"
            onLoadedMetadata={(e) => {
              console.log("loadedmetadata", e.target.duration);
              setDuration(e.target.duration);
            }}
            onLoad={(e) => {
              console.log("load", e.target.duration);
              setDuration(e.target.duration);
            }}
            onLoadedData={(e) => {
              console.log("loadeddata", e.target.duration);
              setDuration(e.target.duration);
            }}
          >
            <source src={track.src} type="audio/mpeg" />
            {track.captionsSrc ? (
              <track kind="captions" src={track.captionsSrc} />
            ) : null}
          </audio>
        ) : null}
      </UpdateContext>
    </StateContext>
  );
}
