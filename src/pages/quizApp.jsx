import { useState } from 'react';
import  LandingPage  from '../Components/QuizApp/LandingPage';
import  QuizSelection  from '../Components/QuizApp/QuizSelection';
import  QuizInterface  from '../Components/QuizApp/QuizInterface';
import  ResultsPage  from '../Components/QuizApp/ResultsPage';

// type AppState = 'landing' | 'selection' | 'quiz' | 'results';

export default function App() {
  const [appState, setAppState] = useState('landing');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });

  const handleGetStarted = () => {
    setAppState('selection');
  };

  const handleSelectQuiz = (categoryId) => {
    setSelectedCategory(categoryId);
    setAppState('quiz');
  };

  const handleQuizComplete = (score, total) => {
    setQuizScore({ score, total });
    setAppState('results');
  };

  const handleRetry = () => {
    setAppState('quiz');
  };

  const handleHome = () => {
    setAppState('landing');
    setSelectedCategory('');
  };

  return (
    <div className="size-full">
      {appState === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {appState === 'selection' && (
        <QuizSelection onSelectQuiz={handleSelectQuiz} />
      )}
      {appState === 'quiz' && (
        <QuizInterface 
          categoryId={selectedCategory} 
          onComplete={handleQuizComplete} 
        />
      )}
      {appState === 'results' && (
        <ResultsPage 
          score={quizScore.score}
          total={quizScore.total}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      )}
    </div>
  );
}
