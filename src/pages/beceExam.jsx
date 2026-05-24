import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { useQuizStore } from "../store/quizStore";
import useStudentsStore from "../store/studentsStore";
import { BECE_SUBJECTS, getBECEQuestions } from "../helper/questionHelper";
import NavBar from "../Components/NavBar";

const SECONDS_PER_SUBJECT = 45 * 60; // 45 minutes

// Preload all questions upfront
const buildExam = () =>
  BECE_SUBJECTS.map((s) => ({
    ...s,
    questions: getBECEQuestions(s.id),
    answers: [],   // array of selected indices (null = unanswered)
  }));

const fmtTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export default function BeceExamScreen() {
  const navigate = useNavigate();
  const { selectedCandidate, setBeceResults } = useQuizStore();
  const { saveBECEResult } = useStudentsStore();

  const [exam] = useState(buildExam);
  const [subjectIdx, setSubjectIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState(() => exam.map((s) => Array(s.questions.length).fill(null)));
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_SUBJECT);
  const [subjectDone, setSubjectDone] = useState(false);
  const [examDone, setExamDone] = useState(false);

  const currentSubject = exam[subjectIdx];
  const currentQ = currentSubject?.questions[questionIdx];

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (subjectDone || examDone) return;
    if (timeLeft <= 0) { handleSubjectComplete(); return; }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, subjectDone, examDone]);

  const timerColor = timeLeft < 120 ? "text-red-500" : timeLeft < 300 ? "text-yellow-500" : "text-[#2ECC71]";

  // ── Finish current subject ─────────────────────────────────────────────────
  const handleSubjectComplete = useCallback(() => {
    setSubjectDone(true);
  }, []);

  // ── Move to next subject ───────────────────────────────────────────────────
  const handleNextSubject = () => {
    if (subjectIdx < exam.length - 1) {
      setSubjectIdx((i) => i + 1);
      setQuestionIdx(0);
      setSelected(null);
      setShowFeedback(false);
      setTimeLeft(SECONDS_PER_SUBJECT);
      setSubjectDone(false);
    } else {
      // All subjects done → compute results
      const results = {};
      exam.forEach((subj, si) => {
        const subAnswers = answers[si];
        let correct = 0;
        subj.questions.forEach((q, qi) => {
          if (subAnswers[qi] === q.correctAnswer) correct++;
        });
        results[subj.id] = {
          score: correct,
          total: subj.questions.length,
          percentage: subj.questions.length ? Math.round((correct / subj.questions.length) * 100) : 0,
        };
      });
      setBeceResults(results);
      if (selectedCandidate?.id) saveBECEResult(selectedCandidate.id, results);
      setExamDone(true);
      navigate("/bece-results");
    }
  };

  // ── Answer selection ───────────────────────────────────────────────────────
  const handleAnswer = (idx) => {
    if (showFeedback || subjectDone) return;
    setSelected(idx);
    setShowFeedback(true);
    setAnswers((prev) => {
      const copy = prev.map((a) => [...a]);
      copy[subjectIdx][questionIdx] = idx;
      return copy;
    });
  };

  const handleNextQuestion = () => {
    if (questionIdx < currentSubject.questions.length - 1) {
      setQuestionIdx((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      handleSubjectComplete();
    }
  };

  // ── Subject complete screen ────────────────────────────────────────────────
  if (subjectDone) {
    const subAnswers = answers[subjectIdx];
    const correct = currentSubject.questions.filter((q, i) => subAnswers[i] === q.correctAnswer).length;
    const pct = Math.round((correct / currentSubject.questions.length) * 100);
    const isLast = subjectIdx === exam.length - 1;

    return (
      <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl border-4 border-[#FFB800] p-8 text-center shadow-2xl">
          <div className="text-6xl mb-3">{currentSubject.emoji}</div>
          <h2 className="font-display text-3xl text-[#1A1A2E] mb-1">{currentSubject.name} Done!</h2>
          <div className="my-6 inline-flex flex-col items-center justify-center w-32 h-32 rounded-full bg-[#FFF3CC] border-4 border-[#FFB800] shadow-lg">
            <span className="font-display text-4xl text-[#FFB800]">{pct}%</span>
            <span className="text-gray-500 font-bold text-sm">{correct}/{currentSubject.questions.length}</span>
          </div>
          <div className="mb-6 flex justify-center gap-4 text-sm font-bold text-gray-500">
            <span>📍 Subject {subjectIdx + 1} of {exam.length}</span>
            {!isLast && <span>Next: {exam[subjectIdx + 1].emoji} {exam[subjectIdx + 1].name}</span>}
          </div>
          <button
            onClick={handleNextSubject}
            className="btn-bounce w-full font-display text-xl bg-[#FFB800] text-[#1A1A2E] py-4 rounded-2xl border-b-4 border-[#cc9200] shadow-lg"
          >
            {isLast ? "Finish Exam! 🏁" : `Next: ${exam[subjectIdx + 1].name} →`}
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const optStyle = (idx) => {
    const base = "w-full p-4 rounded-2xl text-left border-2 font-semibold text-base flex items-center justify-between gap-3 cursor-pointer transition-all";
    if (!showFeedback) return `${base} bg-white border-gray-200 hover:border-[#FFB800] hover:bg-[#FFF3CC]`;
    if (idx === currentQ.correctAnswer) return `${base} bg-green-100 border-green-400 text-green-800`;
    if (idx === selected) return `${base} bg-red-100 border-red-400 text-red-800`;
    return `${base} bg-gray-50 border-gray-200 opacity-40`;
  };

  const progress = ((questionIdx + 1) / currentSubject.questions.length) * 100;
  const correct = selected === currentQ.correctAnswer;

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      {/* Sticky exam header */}
      <div className="sticky top-0 z-50 bg-white border-b-4 border-[#FFB800] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentSubject.emoji}</span>
            <div>
              <p className="font-display text-lg text-[#1A1A2E] leading-none">{currentSubject.name}</p>
              <p className="text-xs text-gray-400 font-semibold">Subject {subjectIdx + 1}/{exam.length}</p>
            </div>
          </div>
          {/* Timer */}
          <div className={`flex items-center gap-1.5 font-display text-2xl ${timerColor}`}>
            <Clock className="size-5" />
            {fmtTime(timeLeft)}
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#FFB800,#2ECC71)" }} />
        </div>
        <div className="max-w-2xl mx-auto mt-1 flex justify-between text-xs text-gray-400 font-bold">
          <span>Q {questionIdx + 1} of {currentSubject.questions.length}</span>
          <span>{selectedCandidate?.name}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Subject tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {exam.map((s, i) => {
            const subAnswers = answers[i];
            const answered = subAnswers.filter((a) => a !== null).length;
            const isDone = i < subjectIdx;
            const isCurrent = i === subjectIdx;
            return (
              <div key={s.id} className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${
                isCurrent ? "bg-[#FFB800] border-[#FFB800] text-[#1A1A2E]" :
                isDone ? "bg-green-100 border-green-300 text-green-700" :
                "bg-gray-100 border-gray-200 text-gray-400"}`}>
                {s.emoji} {s.name.split(" ")[0]}
                {isDone && " ✓"}
              </div>
            );
          })}
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-4 shadow-sm">
          <p className="font-display text-xl text-[#1A1A2E] leading-snug mb-5">
            {questionIdx + 1}. {currentQ.question}
          </p>
          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback} className={optStyle(idx)}>
                <span><strong>{String.fromCharCode(65 + idx)}.</strong> {opt}</span>
                {showFeedback && idx === currentQ.correctAnswer && <CheckCircle2 className="size-5 text-green-600 shrink-0" />}
                {showFeedback && idx === selected && idx !== currentQ.correctAnswer && <XCircle className="size-5 text-red-600 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <>
            <div className={`rounded-3xl border-2 p-4 mb-4 text-center fade-in-up ${correct ? "bg-green-100 border-green-400 text-green-800" : "bg-red-100 border-red-400 text-red-800"}`}>
              <p className="font-display text-xl">{correct ? "🎉 Correct!" : `❌ Answer: ${currentQ.options[currentQ.correctAnswer]}`}</p>
            </div>
            <button onClick={handleNextQuestion}
              className="btn-bounce w-full font-display text-xl bg-[#FFB800] text-[#1A1A2E] py-4 rounded-3xl border-b-[6px] border-[#cc9200] shadow-xl">
              {questionIdx < currentSubject.questions.length - 1 ? "Next Question →" : "Finish Subject ✓"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
