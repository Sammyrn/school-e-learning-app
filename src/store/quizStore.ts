import { create } from 'zustand';

interface QuizState {
  selectedCategory: string;
  score: number;
  total: number;
  selectedCandidate: any;
  examMode: 'practice' | 'bece'; // practice = subject quiz, bece = full mock
  beceResults: Record<string, { score: number; total: number; percentage: number }> | null;
  setSelectedCandidate: (student: any) => void;
  setSelectedCategory: (category: string) => void;
  setQuizResult: (score: number, total: number) => void;
  setExamMode: (mode: 'practice' | 'bece') => void;
  setBeceResults: (results: Record<string, { score: number; total: number; percentage: number }>) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  selectedCategory: '',
  score: 0,
  total: 0,
  selectedCandidate: {},
  examMode: 'practice',
  beceResults: null,
  setSelectedCandidate: (student) => set({ selectedCandidate: student }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setQuizResult: (score, total) => set({ score, total }),
  setExamMode: (mode) => set({ examMode: mode }),
  setBeceResults: (results) => set({ beceResults: results }),
  resetQuiz: () => set({ selectedCandidate: {}, selectedCategory: '', score: 0, total: 0, examMode: 'practice', beceResults: null }),
}));
