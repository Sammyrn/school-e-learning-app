import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import NavBar from "../Components/NavBar";
import { BECE_SUBJECTS } from "../helper/questionHelper";

const grade = (pct) => {
  if (pct >= 75) return { letter: "A1", label: "Distinction", color: "text-green-700", bg: "bg-green-100" };
  if (pct >= 65) return { letter: "B2", label: "Very Good",   color: "text-blue-700",  bg: "bg-blue-100"  };
  if (pct >= 60) return { letter: "B3", label: "Good",        color: "text-blue-700",  bg: "bg-blue-100"  };
  if (pct >= 55) return { letter: "C4", label: "Credit",      color: "text-teal-700",  bg: "bg-teal-100"  };
  if (pct >= 50) return { letter: "C5", label: "Credit",      color: "text-teal-700",  bg: "bg-teal-100"  };
  if (pct >= 45) return { letter: "C6", label: "Credit",      color: "text-yellow-700",bg: "bg-yellow-100"};
  if (pct >= 40) return { letter: "D7", label: "Pass",        color: "text-orange-700",bg: "bg-orange-100"};
  if (pct >= 35) return { letter: "E8", label: "Pass",        color: "text-orange-700",bg: "bg-orange-100"};
  return              { letter: "F9", label: "Fail",          color: "text-red-700",   bg: "bg-red-100"   };
};

const BeceResultsScreen = () => {
  const navigate = useNavigate();
  const { beceResults, selectedCandidate, resetQuiz } = useQuizStore();

  if (!beceResults) { navigate("/"); return null; }

  const subjects = BECE_SUBJECTS.filter((s) => beceResults[s.id]);
  const total = subjects.reduce((a, s) => a + beceResults[s.id].score, 0);
  const totalQs = subjects.reduce((a, s) => a + beceResults[s.id].total, 0);
  const overallPct = Math.round((total / totalQs) * 100);
  const overallGrade = grade(overallPct);

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header card */}
        <div className="bg-[#1A1A2E] rounded-3xl p-8 text-center mb-6 shadow-xl">
          <div className="text-6xl mb-3">📋</div>
          <h1 className="font-display text-4xl text-[#FFB800] mb-1">BECE Mock Results</h1>
          {selectedCandidate?.name && (
            <p className="text-gray-300 font-semibold">{selectedCandidate.name} · {selectedCandidate.class}</p>
          )}

          {/* Overall score */}
          <div className="mt-6 inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-[#FFB800] border-4 border-[#cc9200] shadow-xl">
            <span className="font-display text-5xl text-[#1A1A2E]">{overallPct}%</span>
            <span className="font-bold text-[#1A1A2E] text-sm">{overallGrade.letter}</span>
          </div>
          <p className="text-gray-400 font-semibold mt-3">{total}/{totalQs} questions correct</p>
        </div>

        {/* Per-subject breakdown */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="font-display text-2xl text-[#1A1A2E] mb-4">📊 Subject Breakdown</h2>
          <div className="flex flex-col gap-3">
            {subjects.map((s) => {
              const r = beceResults[s.id];
              const g = grade(r.percentage);
              return (
                <div key={s.id} className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border-2 border-gray-100">
                  <span className="text-2xl shrink-0">{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#1A1A2E] text-sm">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-display text-lg ${g.color}`}>{g.letter}</span>
                        <span className="text-xs text-gray-400 font-bold">{r.score}/{r.total}</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${g.bg.replace('bg-','bg-').replace('100','500')}`}
                        style={{ width: `${r.percentage}%` }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className={`text-xs font-bold ${g.color}`}>{g.label}</span>
                      <span className="text-xs text-gray-400 font-bold">{r.percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BECE grading scale */}
        <div className="bg-[#FFF3CC] border-2 border-[#FFB800] rounded-3xl p-5 mb-6">
          <h3 className="font-display text-xl text-[#1A1A2E] mb-3">📌 BECE Grading Scale</h3>
          <div className="grid grid-cols-2 gap-1.5 text-sm font-semibold">
            {[["A1","75-100%","Distinction"],["B2","65-74%","Very Good"],["B3","60-64%","Good"],
              ["C4","55-59%","Credit"],["C5","50-54%","Credit"],["C6","45-49%","Credit"],
              ["D7","40-44%","Pass"],["E8","35-39%","Pass"],["F9","0-34%","Fail"]].map(([l,r,d]) => (
              <div key={l} className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5">
                <span className="font-display text-base text-[#cc9200]">{l}</span>
                <span className="text-gray-500 text-xs">{r} · {d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button onClick={() => { resetQuiz(); navigate("/quiz_app"); }}
            className="btn-bounce w-full font-display text-xl bg-[#FFB800] text-[#1A1A2E] py-4 rounded-2xl border-b-4 border-[#cc9200] shadow-lg">
            🔁 Take Another Mock
          </button>
          <button onClick={() => selectedCandidate?.id && navigate(`/student/${selectedCandidate.id}`)}
            className="btn-bounce w-full font-display text-xl bg-[#3BB4F2] text-white py-4 rounded-2xl border-b-4 border-[#1a7ab8] shadow-lg">
            👤 View My Profile
          </button>
          <button onClick={() => { resetQuiz(); navigate("/"); }}
            className="btn-bounce w-full font-display text-xl bg-white text-[#1A1A2E] py-4 rounded-2xl border-b-4 border-gray-200 shadow">
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default BeceResultsScreen;
