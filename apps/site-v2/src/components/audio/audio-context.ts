import { createContext } from "react";

export type AudioStateContext = {
  playing: boolean;
  time: number;
  volume: number;
  speed: number;
  muted: boolean;
  duration: number;
  track: { src: string; captionsSrc: string } | null;
};

export let StateContext = createContext<AudioStateContext | null>(null);

export type AudioUpdateContext = {
  setPlaying(shouldPlay: boolean): void;
  setTime(time: number): void;
  setVolume(volume: number): void;
  setSpeed(speed: number): void;
  setMuted(muted: boolean): void;
  setTrack({ src, captionsSrc }: { src: string; captionsSrc: string }): void;
};

export let UpdateContext = createContext<AudioUpdateContext | null>(null);
