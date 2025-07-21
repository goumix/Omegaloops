"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { Play, Pause} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  ipfsHash: string;
  fileType: string;
  fileName?: string;
  className?: string;
}

export function MediaPlayer({ fileType, className }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isVideo = fileType.startsWith('video/');
  const isAudio = fileType.startsWith('audio/');

  useEffect(() => {
    const mediaElement = isVideo ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const handleLoadedMetadata = () => {
      setDuration(mediaElement.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(mediaElement.currentTime);
    };

    const handleError = () => {
      setError("Failed to load media file");
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    mediaElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    mediaElement.addEventListener('timeupdate', handleTimeUpdate);
    mediaElement.addEventListener('error', handleError);
    mediaElement.addEventListener('ended', handleEnded);

    return () => {
      mediaElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
      mediaElement.removeEventListener('error', handleError);
      mediaElement.removeEventListener('ended', handleEnded);
    };
  }, [isVideo]);

  const togglePlay = async () => {
    const mediaElement = isVideo ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    try {
      if (isPlaying) {
        await mediaElement.pause();
        setIsPlaying(false);
      } else {
        await mediaElement.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing media:', error);
      setError("Failed to play media file");
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mediaElement = isVideo ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    mediaElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isVideo && !isAudio) {
    return null;
  }

  return (
    <Card className={cn("bg-zinc-800/50 border-zinc-700 p-4", className)}>

      {/* Player UI */}
      <div className="space-y-3">

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlay}
            disabled={isLoading || !!error}
            className="flex-shrink-0"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-tertiary border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          {/* Progress bar */}
          {!isLoading && !error && (
            <div className="flex-grow">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}
          {/* Time display */}
          {!isLoading && !error && (
            <div className="flex items-center space-x-2 text-sm text-zinc-400 min-w-0">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          )}
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-2">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && !error && (
          <div className="text-center py-2">
            <p className="text-sm text-zinc-400">Loading media...</p>
          </div>
        )}
      </div>
    </Card>
  );
}
