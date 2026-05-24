import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";
import NavBar from "../Components/NavBar";
import BackButton from "../Components/BackButton";
import { BECE_SUBJECTS } from "../helper/questionHelper";

const BeceIntroScreen = () => {
  const navigate = useNavigate();
  const { selectedCandidate } = useQuizStore();

  if (!selectedCandidate?.id) { navigate("/quiz_app"); return null; }

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6"><BackButton /></div>

        <div className="bg-[#1A1A2E] rounded-3xl p-8 text-white mb-6 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="font-display text-4xl text-[#FFB800] mb-2">BECE Mock Exam</h1>
          <p className="text-gray-300 font-semibold">Junior WAEC Practice — Full Simulation</p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="font-display text-2xl text-[#1A1A2E] mb-4">📌 Instructions</h2>
          <ul className="flex flex-col gap-3 text-gray-700 font-semibold">
            {[
              ["📝", "You will answer 40 questions per subject"],
              ["⏱️", "Each subject has a 45-minute timer"],
              ["🔒", "You cannot go back to a previous question"],
              ["✅", "Select one answer per question"],
              ["📊", "Your results are saved to your profile"],
              ["🎓", "Take each subject seriously — treat it like the real exam!"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="font-display text-2xl text-[#1A1A2E] mb-4">📚 Subjects in this exam</h2>
          <div className="grid grid-cols-1 gap-2">
            {BECE_SUBJECTS.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-3 rounded-2xl px-4 py-3 border-2 ${s.color}`}>
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-bold">{i + 1}. {s.name}</span>
                <span className="ml-auto text-sm opacity-70">40 questions · 45 min</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#FFF3CC] border-2 border-[#FFB800] rounded-2xl px-5 py-4 mb-6">
          <span className="text-2xl">👤</span>
          <div>
            <p className="font-bold text-[#1A1A2E]">Candidate: {selectedCandidate.name}</p>
            <p className="text-sm text-[#cc9200] font-semibold">{selectedCandidate.class}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/bece-exam")}
          className="btn-bounce w-full font-display text-2xl bg-[#FFB800] text-[#1A1A2E] py-4 rounded-3xl border-b-[6px] border-[#cc9200] shadow-xl"
        >
          Start Exam! 🚀
        </button>
      </div>
    </div>
  );
};
export default BeceIntroScreen;
