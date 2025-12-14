import React from 'react';
import { useAudio } from '@/context/AudioContext';
import { PlayerControls } from '@/components/PlayerControls';

export const NowPlaying: React.FC = () => {
  const { currentStory } = useAudio();
  if (!currentStory) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500 pb-20">
        <p>Nothing is playing</p>
        <p className="text-sm">Select a story from the home screen</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen pb-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <img src={currentStory.coverUrl} alt={currentStory.title} className="w-72 h-72 rounded-2xl shadow-2xl mb-8" />
        <h1 className="text-3xl font-bold mb-2">{currentStory.title}</h1>
        <p className="text-lg text-gray-400 mb-1">{currentStory.author}</p>
        <p className="text-sm text-gray-500">{currentStory.duration}</p>
      </div>
      <div className="p-8"><PlayerControls /></div>
    </div>
  );
};
