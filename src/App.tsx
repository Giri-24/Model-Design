import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { NowPlaying } from './pages/NowPlaying';
import { QuizCraft } from './pages/QuizCraft';
import { dummyStories } from './data/stories';

function App() {
  return (
    <AudioProvider stories={dummyStories}>
      <Router>
        <div className="relative min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route path="/quiz" element={<QuizCraft />} />
            <Route path="/profile" element={<div className="p-6"><h1>Profile Page</h1></div>} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
