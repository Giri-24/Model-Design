import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export const PlayerControls: React.FC = () => {
  const { isPlaying, togglePlayPause, progress, seekTo, volume, setVolume, duration, playNext, playPrevious } = useAudio();

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    seekTo(newProgress);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = (clickX / rect.width) * 100;
    setVolume(newVolume);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="cursor-pointer" onClick={handleProgressClick}>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-white h-2 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{formatTime((progress / 100) * duration)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center justify-center gap-6">
        <button onClick={playPrevious} className="text-gray-400 hover:text-white transition-colors"><SkipBack className="w-8 h-8" /></button>
        <button onClick={togglePlayPause} className="bg-white text-gray-900 p-4 rounded-full hover:scale-105 transition-transform">
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
        </button>
        <button onClick={playNext} className="text-gray-400 hover:text-white transition-colors"><SkipForward className="w-8 h-8" /></button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="w-24 bg-gray-700 rounded-full h-1 cursor-pointer" onClick={handleVolumeClick}>
          <div className="bg-white h-1 rounded-full relative" style={{ width: `${volume}%` }}>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
