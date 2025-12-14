export interface Story {
  id: number;
  title: string;
  author: string;
  duration: string;
  coverUrl: string;
  audioUrl: string; // Placeholder for real audio
}

export interface QuizConfig {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
