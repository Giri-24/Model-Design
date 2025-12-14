import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from 'react';
import { Story } from '@/types';

interface AudioContextType {
  currentStory: Story | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  duration: number;
  playStory: (story: Story) => void;
  togglePlayPause: () => void;
  seekTo: (newProgress: number) => void;
  setVolume: (newVolume: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);
const STORY_DURATION = 255; // 4:15 in seconds

export const AudioProvider: React.FC<{ children: ReactNode; stories: Story[] }> = ({ children, stories }) => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(75);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && progress < 100) {
      intervalRef.current = setInterval(() => { setProgress(p => (p >= 99.9 ? 100 : p + (100 / STORY_DURATION))); }, 1000);
    } else { if (intervalRef.current) clearInterval(intervalRef.current); }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, progress]);

  const playStory = useCallback((story: Story) => {
    if (currentStory?.id === story.id) { setIsPlaying(true); } else { setCurrentStory(story); setProgress(0); setIsPlaying(true); }
  }, [currentStory]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const seekTo = (newProgress: number) => setProgress(Math.min(100, Math.max(0, newProgress)));
  const setVolume = (newVolume: number) => setVolumeState(Math.min(100, Math.max(0, newVolume)));
  const playNext = () => { if (!currentStory) return; const currentIndex = stories.findIndex(s => s.id === currentStory.id); const nextStory = stories[(currentIndex + 1) % stories.length]; playStory(nextStory); };
  const playPrevious = () => { if (!currentStory) return; const currentIndex = stories.findIndex(s => s.id === currentStory.id); const prevStory = stories[(currentIndex - 1 + stories.length) % stories.length]; playStory(prevStory); };

  return (
    <AudioContext.Provider value={{ currentStory, isPlaying, progress, volume, duration: STORY_DURATION, playStory, togglePlayPause, seekTo, setVolume, playNext, playPrevious }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
