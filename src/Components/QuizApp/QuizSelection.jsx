import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../store/quizStore";
import BackButton from "../BackButton";
import NavBar from "../NavBar";
import { BECE_SUBJECTS } from "../../helper/questionHelper";

export default function QuizSelection() {
  const navigate = useNavigate();
  const setSelectedCategory = useQuizStore((s) => s.setSelectedCategory);
  const selectedCandidate = useQuizStore((s) => s.selectedCandidate);

  const handleSelect = (id) => {
    setSelectedCategory(id);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-4"><BackButton /></div>

        {selectedCandidate?.name && (
          <div className="flex items-center gap-3 bg-white rounded-2xl border-2 border-[#2ECC71]/30 px-5 py-3 mb-6 w-fit shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FFF3CC] overflow-hidden border-2 border-[#FFB800] flex items-center justify-center">
              {selectedCandidate.image
                ? <img src={selectedCandidate.image} alt="" className="w-full h-full object-cover" />
                : <span className="text-xl">{selectedCandidate.gender === "Female" ? "👧" : "👦"}</span>}
            </div>
            <div>
              <p className="font-bold text-[#1A1A2E] leading-none">{selectedCandidate.name}</p>
              <p className="text-xs text-gray-400 font-semibold">{selectedCandidate.class} · ⚡ Practice Mode</p>
            </div>
          </div>
        )}

        <h1 className="font-display text-4xl text-[#1A1A2E] mb-2">Pick a Subject! 📚</h1>
        <p className="text-gray-500 font-semibold mb-8">Choose what you want to be tested on today — 15 questions, let's go!</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {BECE_SUBJECTS.map((cat, i) => (
            <button key={cat.id} onClick={() => handleSelect(cat.id)}
              className={`card-pop rounded-3xl border-2 p-6 flex flex-col items-center gap-2 text-center fade-in-up ${cat.color}`}
              style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="text-5xl hover-wobble inline-block">{cat.emoji}</span>
              <span className="font-display text-lg leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
