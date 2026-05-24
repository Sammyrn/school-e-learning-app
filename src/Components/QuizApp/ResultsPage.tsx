import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';
import useStudentsStore from '../../store/studentsStore';

const TIERS = [
  { min: 80, emoji: "🏆", title: "Amazing!",    sub: "You're a star pupil!", bg: "bg-green-100",  border: "border-green-400",  text: "text-green-700",  bar: "bg-green-500"  },
  { min: 60, emoji: "🎉", title: "Great Job!",  sub: "You did really well!", bg: "bg-blue-100",   border: "border-blue-400",   text: "text-blue-700",   bar: "bg-blue-500"   },
  { min: 40, emoji: "💪", title: "Good Try!",   sub: "Keep practicing!",     bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-700", bar: "bg-yellow-500" },
  { min: 0,  emoji: "📚", title: "Keep Going!", sub: "Every try makes you smarter!", bg: "bg-red-100", border: "border-red-400", text: "text-red-700", bar: "bg-red-500" },
];

export default function ResultsPage() {
  const navigate = useNavigate();
  const score = useQuizStore((s) => s.score);
  const total = useQuizStore((s) => s.total);
  const selectedCategory = useQuizStore((s) => s.selectedCategory);
  const selectedCandidate = useQuizStore((s) => s.selectedCandidate);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const saveQuizResult = useStudentsStore((s) => s.saveQuizResult);

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const tier = TIERS.find((t) => percentage >= t.min)!;

  useEffect(() => {
    if (selectedCandidate?.id && selectedCategory && total > 0) {
      saveQuizResult(selectedCandidate.id, { subject: selectedCategory, score, total, percentage, mode: 'practice' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center px-4 py-10">
      <div className={`w-full max-w-md rounded-3xl border-4 ${tier.border} ${tier.bg} p-8 text-center shadow-2xl fade-in-up`}>
        <div className="text-8xl mb-4 float">{tier.emoji}</div>
        <h1 className={`font-display text-5xl mb-1 ${tier.text}`}>{tier.title}</h1>
        <p className={`font-bold text-lg mb-6 ${tier.text} opacity-70`}>{tier.sub}</p>

        <div className={`inline-flex flex-col items-center justify-center w-40 h-40 rounded-full bg-white border-4 ${tier.border} shadow-lg mb-6`}>
          <span className={`font-display text-5xl ${tier.text}`}>{percentage}%</span>
          <span className="text-gray-400 font-bold text-sm">{score}/{total} correct</span>
        </div>

        <div className="w-full h-5 bg-white/60 rounded-full overflow-hidden border-2 border-white mb-6">
          <div className={`h-full rounded-full transition-all duration-700 ${tier.bar}`} style={{ width: `${percentage}%` }} />
        </div>

        {selectedCandidate?.name && (
          <p className="font-bold text-gray-500 mb-6">{selectedCandidate.name} · {selectedCategory}</p>
        )}

        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('/quiz')}
            className="btn-bounce w-full font-display text-xl bg-[#FFB800] text-[#1A1A2E] py-4 rounded-2xl border-b-[6px] border-[#cc9200] shadow-lg">
            🔁 Try Again!
          </button>
          <button onClick={() => navigate('/categories')}
            className="btn-bounce w-full font-display text-xl bg-[#3BB4F2] text-white py-4 rounded-2xl border-b-[6px] border-[#1a7ab8] shadow-lg">
            📚 New Subject
          </button>
          <button onClick={() => { resetQuiz(); navigate('/'); }}
            className="btn-bounce w-full font-display text-xl bg-white text-[#1A1A2E] py-4 rounded-2xl border-b-[6px] border-gray-200 shadow">
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
