import React, { useState } from 'react';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { QuizConfig } from '@/types';

const topics = ['Science', 'History', 'Literature', 'Geography', 'Arts', 'Technology'];
const difficulties: Array<{ level: QuizConfig['difficulty']; label: string; color: string }> = [
  { level: 'easy', label: 'Easy Peasy', color: 'bg-green-100 text-green-800 border-green-300' },
  { level: 'medium', label: 'Just Right', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { level: 'hard', label: 'Hardcore', color: 'bg-red-100 text-red-800 border-red-300' },
];

export const QuizCraft: React.FC = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<QuizConfig>({ topic: '', difficulty: 'easy' });
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleTopicSelect = (topic: string) => { setConfig({ ...config, topic }); setStep(2); };
  const handleDifficultySelect = (difficulty: QuizConfig['difficulty']) => { setConfig({ ...config, difficulty }); };
  const handleGenerate = async () => { setIsLoading(true); await new Promise(resolve => setTimeout(resolve, 2000)); setIsLoading(false); setIsGenerated(true); };
  const handleStartOver = () => { setStep(1); setConfig({ topic: '', difficulty: 'easy' }); setIsGenerated(false); };

  return (
    <div className="p-6 pb-20 max-w-md mx-auto">
      <header className="mb-8">
        {step === 2 && !isGenerated && (<button onClick={() => setStep(1)} className="mb-4 flex items-center text-primary-600"><ArrowLeft className="w-5 h-5 mr-1" /> Back</button>)}
        <h1 className="text-2xl font-bold text-gray-900">{isGenerated ? 'Quiz Ready!' : 'Craft a Custom Quiz'}</h1>
        <p className="text-gray-600">{isGenerated ? 'Your quiz has been generated.' : `Step ${step} of 2`}</p>
      </header>
      {step === 1 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Choose a Topic</h2>
          <div className="grid grid-cols-2 gap-3">{topics.map(topic => (<button key={topic} onClick={() => handleTopicSelect(topic)} className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all text-center font-medium">{topic}</button>))}</div>
        </section>
      )}
      {step === 2 && !isGenerated && (
        <section className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Pick a Challenge Level</h2>
            <div className="space-y-3">{difficulties.map(({ level, label, color }) => (<button key={level} onClick={() => handleDifficultySelect(level)} className={`w-full p-4 border-2 rounded-xl flex justify-between items-center transition-all font-medium ${config.difficulty === level ? `${color} border-current` : 'border-gray-200 hover:border-gray-300'}`}><span>{label}</span>{config.difficulty === level && <Check className="w-5 h-5" /></button>))}</div>
          </div>
          <div className="pt-4"><button onClick={handleGenerate} disabled={isLoading} className="w-full bg-primary-600 text-white font-semibold rounded-full py-3 text-base hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">{isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}{isLoading ? 'Generating...' : 'Generate Quiz'}</button></div>
        </section>
      )}
      {isGenerated && (
        <section className="space-y-6 text-center">
          <div className="bg-green-100 p-6 rounded-2xl">
            <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800">Quiz Created!</h3>
            <p className="text-green-700 mt-2">Topic: <span className="font-semibold">{config.topic}</span><br/>Difficulty: <span className="font-semibold">{config.difficulty}</span></p>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-primary-600 text-white font-semibold rounded-full py-3 text-base hover:bg-primary-700 transition-colors">Start Quiz</button>
            <button onClick={handleStartOver} className="w-full bg-gray-200 text-gray-800 font-semibold rounded-full py-3 text-base hover:bg-gray-300 transition-colors">Create Another</button>
          </div>
        </section>
      )}
    </div>
  );
};
