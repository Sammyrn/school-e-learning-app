import { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../store/quizStore";
import { getPracticeQuestions } from "../../helper/questionHelper";
import NavBar from "../NavBar";
import BackButton from "../BackButton";

export default function QuizInterface() {
  const navigate = useNavigate();
  const { selectedCategory, setQuizResult, selectedCandidate } = useQuizStore();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedCandidate?.id || !selectedCategory) { navigate("/categories"); return; }
    const qs = getPracticeQuestions(selectedCandidate.class, selectedCategory);
    if (!qs.length) { alert("No questions available for this subject yet!"); navigate("/categories"); return; }
    setQuestions(qs);
    setLoading(false);
  }, []);

  const q = questions[current];
  const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0;

  const handleAnswer = (idx) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === q.correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    const newScore = selected === q.correctAnswer ? score : score; // already updated
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setQuizResult(score, questions.length);
      navigate("/results");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center">
      <div className="text-center"><div className="text-7xl float mb-4">🧠</div>
        <p className="font-display text-3xl text-[#1A1A2E]">Loading…</p></div>
    </div>
  );

  const optStyle = (idx) => {
    const base = "w-full p-4 rounded-2xl text-left border-2 font-semibold text-lg flex items-center justify-between gap-3 cursor-pointer transition-all";
    if (!showFeedback) return `${base} bg-white border-gray-200 hover:border-[#FFB800] hover:bg-[#FFF3CC]`;
    if (idx === q.correctAnswer) return `${base} bg-green-100 border-green-400 text-green-800`;
    if (idx === selected) return `${base} bg-red-100 border-red-400 text-red-800`;
    return `${base} bg-gray-50 border-gray-200 opacity-40`;
  };

  const correct = selected === q.correctAnswer;

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <BackButton onClick={() => navigate("/categories")} />
          <span className="font-bold text-gray-400 text-sm">{selectedCandidate?.name} · ⚡ Practice</span>
        </div>

        <div className="bg-white rounded-3xl border-2 border-gray-100 p-5 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-display text-xl">Q {current + 1} / {questions.length}</span>
            <span className="font-bold text-[#2ECC71] text-lg">⭐ {score} pts</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#2ECC71,#3BB4F2)" }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-4 shadow-sm">
          <p className="font-display text-2xl text-[#1A1A2E] leading-snug mb-6">🤔 {q.question}</p>
          <div className="flex flex-col gap-3">
            {q.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback} className={optStyle(idx)}>
                <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                {showFeedback && idx === q.correctAnswer && <CheckCircle2 className="size-6 text-green-600 shrink-0" />}
                {showFeedback && idx === selected && idx !== q.correctAnswer && <XCircle className="size-6 text-red-600 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`rounded-3xl border-2 p-5 mb-4 text-center fade-in-up ${correct ? "bg-green-100 border-green-400 text-green-800" : "bg-red-100 border-red-400 text-red-800"}`}>
            <p className="font-display text-2xl">{correct ? "🎉 Correct! Well done!" : `😅 Oops! Answer: ${q.options[q.correctAnswer]}`}</p>
          </div>
        )}

        {showFeedback && (
          <button onClick={handleNext}
            className="btn-bounce w-full font-display text-2xl bg-[#FFB800] text-[#1A1A2E] py-4 rounded-3xl border-b-[6px] border-[#cc9200] shadow-xl">
            {current < questions.length - 1 ? "Next Question →" : "See Results! 🏆"}
          </button>
        )}
      </div>
    </div>
  );
}
