import React from 'react';
import { Play } from 'lucide-react';
import { Story } from '@/types';
import { useAudio } from '@/context/AudioContext';

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const { playStory } = useAudio();

  return (
    <div className="flex-none w-32 cursor-pointer group" onClick={() => playStory(story)}>
      <div className="relative w-32 h-32 rounded-lg overflow-hidden mb-2 shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <img src={story.coverUrl} alt={story.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="w-6 h-6 text-primary-600 fill-current" />
          </div>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-900 truncate">{story.title}</p>
      <p className="text-xs text-gray-500 truncate">{story.author}</p>
    </div>
  );
};
