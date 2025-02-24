"use client";

import { Gauge, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "#components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { Slider } from "#components/ui/slider";
import { StateContext, UpdateContext } from "./audio-context";

interface AudioPlayerProps {
  src: string;
  captionsSrc: string;
}

let PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function formatTime(time: number) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function REFERENCE____AudioPlayer({
  src,
  captionsSrc,
}: AudioPlayerProps) {
  let audioRef = useRef<HTMLAudioElement>(null);
  let [isPlaying, setIsPlaying] = useState(false);
  let [currentTime, setCurrentTime] = useState(0);
  let [duration, setDuration] = useState(0);
  let [isMuted, setIsMuted] = useState(false);
  let [volume, setVolume] = useState(1);
  let [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    let audio = audioRef.current;
    if (!audio) {
      return;
    }

    let abortController = new AbortController();

    let updateTime = () => setCurrentTime(audio.currentTime);
    let updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime, {
      signal: abortController.signal,
    });
    audio.addEventListener("loadedmetadata", updateDuration, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
  }, []);

  let togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  let toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  let handleVolumeChange = (value: number[]) => {
    let newVolume = value[0];
    if (audioRef.current && newVolume !== undefined) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  let handleTimeChange = (value: number[]) => {
    let newTime = value[0];
    if (audioRef.current && newTime !== undefined) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  let handleSpeedChange = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  // let formatTime = (time: number) => {
  //   let minutes = Math.floor(time / 60);
  //   let seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  // };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-lg bg-background shadow-lg border">
      <audio ref={audioRef} src={src}>
        <track kind="captions" src={captionsSrc} />
      </audio>

      <div className="space-y-4">
        {/* Progress bar */}
        <div className="space-y-1">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="my-2 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-none [&_[role=slider]]:bg-primary [&_[role=slider]]:-mt-1.5 [&>span]:h-1 [&>span]:bg-primary/30 [&>span>span]:bg-primary"
          />
          <div className="flex justify-between text-sm text-muted-foreground px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            {/* Playback Speed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 hover:bg-primary/10 hover:text-primary flex items-center gap-1"
                >
                  <Gauge className="h-4 w-4" />
                  <span className="text-xs font-medium">{playbackSpeed}x</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {PLAYBACK_SPEEDS.map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={
                      speed === playbackSpeed
                        ? "bg-primary/10 text-primary"
                        : ""
                    }
                  >
                    {speed}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-none [&_[role=slider]]:bg-primary [&_[role=slider]]:-mt-1.5 [&>span]:h-1 [&>span]:bg-primary/30 [&>span>span]:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AudioControls() {
  let stateContext = use(StateContext);
  let updateContext = use(UpdateContext);

  if (!stateContext) {
    return null;
  }
  if (!updateContext) {
    return null;
  }

  let { playing, time, volume, speed, muted, duration } = stateContext;
  let { setMuted, setPlaying, setTime, setVolume, setSpeed } = updateContext;

  console.log({ duration });

  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-lg bg-background shadow-lg border">
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="space-y-1">
          <Slider
            value={[time]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={(value) => setTime(value[0] || 0)}
            className="my-2 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-none [&_[role=slider]]:bg-primary [&_[role=slider]]:-mt-1.5 [&>span]:h-1 [&>span]:bg-primary/30 [&>span>span]:bg-primary"
          />
          <div className="flex justify-between text-sm text-muted-foreground px-1">
            <span>{formatTime(time)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setPlaying(!playing);
              }}
              aria-label={playing ? "Pause" : "Play"}
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary"
            >
              {playing ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>

            {/* Playback Speed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 hover:bg-primary/10 hover:text-primary flex items-center gap-1"
                >
                  <Gauge className="h-4 w-4" />
                  <span className="text-xs font-medium">{speed}x</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {PLAYBACK_SPEEDS.map((playbackSpeedOption) => (
                  <DropdownMenuItem
                    key={playbackSpeedOption}
                    onClick={() => setSpeed(playbackSpeedOption)}
                    className={
                      playbackSpeedOption === speed
                        ? "bg-primary/10 text-primary"
                        : ""
                    }
                  >
                    {playbackSpeedOption}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMuted(!muted)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            >
              {muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[muted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(value) => setVolume(value[0] || 0)}
              className="w-24 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-none [&_[role=slider]]:bg-primary [&_[role=slider]]:-mt-1.5 [&>span]:h-1 [&>span]:bg-primary/30 [&>span>span]:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
