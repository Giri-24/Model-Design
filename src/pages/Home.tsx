import React, { useRef } from 'react';
import { Star, Zap, Trophy, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { StoryCard } from '@/components/StoryCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { dummyStories } from '@/data/stories';

export const Home: React.FC = () => {
  const xp = 1250; const nextLevelXp = 2000; const progress = (xp / nextLevelXp) * 100;
  const continueRef = useRef<HTMLDivElement>(null); const recommendedRef = useRef<HTMLDivElement>(null);
  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) ref.current.scrollBy({ left: direction === 'left' ? -150 : 150, behavior: 'smooth' });
  };
  const handleActionClick = (action: string) => alert(`Action clicked: ${action}`);

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-b from-primary-600 to-primary-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div><h1 className="text-2xl font-bold">Welcome back, Alex!</h1><p className="text-primary-100">Ready for today's adventure?</p></div>
          <img src="https://picsum.photos/seed/avatar1/50/50.jpg" alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-white" />
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="flex justify-between items-center mb-1"><span className="text-sm font-semibold">Level 5</span><span className="text-sm">{xp} / {nextLevelXp} XP</span></div>
          <ProgressBar progress={progress} />
        </div>
      </header>
      <main className="p-6 space-y-6">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">What's on your mind?</h2>
          <div className="grid grid-cols-4 gap-4">
            <div onClick={() => handleActionClick('Daily')} className="flex flex-col items-center cursor-pointer"><div className="bg-purple-100 p-4 rounded-2xl mb-2 hover:bg-purple-200 transition-colors"><Zap className="w-6 h-6 text-primary-600" /></div><span className="text-xs text-gray-700">Daily</span></div>
            <div onClick={() => handleActionClick('Library')} className="flex flex-col items-center cursor-pointer"><div className="bg-blue-100 p-4 rounded-2xl mb-2 hover:bg-blue-200 transition-colors"><BookOpen className="w-6 h-6 text-blue-600" /></div><span className="text-xs text-gray-700">Library</span></div>
            <div onClick={() => handleActionClick('Goals')} className="flex flex-col items-center cursor-pointer"><div className="bg-green-100 p-4 rounded-2xl mb-2 hover:bg-green-200 transition-colors"><Trophy className="w-6 h-6 text-green-600" /></div><span className="text-xs text-gray-700">Goals</span></div>
            <div onClick={() => handleActionClick('Favorites')} className="flex flex-col items-center cursor-pointer"><div className="bg-yellow-100 p-4 rounded-2xl mb-2 hover:bg-yellow-200 transition-colors"><Star className="w-6 h-6 text-yellow-600" /></div><span className="text-xs text-gray-700">Favorites</span></div>
          </div>
        </section>
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Continue Listening</h2>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(continueRef, 'left')} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><ChevronLeft className="w-5 h-5"/></button>
              <button onClick={() => scroll(continueRef, 'right')} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><ChevronRight className="w-5 h-5"/></button>
            </div>
          </div>
          <div ref={continueRef} className="flex gap-4 overflow-x-auto scrollbar-hide">{dummyStories.slice(0, 3).map(story => <StoryCard key={story.id} story={story} />)}</div>
        </section>
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll(recommendedRef, 'left')} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><ChevronLeft className="w-5 h-5"/></button>
              <button onClick={() => scroll(recommendedRef, 'right')} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><ChevronRight className="w-5 h-5"/></button>
            </div>
          </div>
          <div ref={recommendedRef} className="flex gap-4 overflow-x-auto scrollbar-hide">{dummyStories.slice(2).map(story => <StoryCard key={story.id} story={story} />)}</div>
        </section>
      </main>
    </div>
  );
};
