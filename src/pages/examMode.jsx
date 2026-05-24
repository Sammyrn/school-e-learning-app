import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import BackButton from "../Components/BackButton";
import { useQuizStore } from "../store/quizStore";

const ExamModeScreen = () => {
  const navigate = useNavigate();
  const { selectedCandidate, setExamMode } = useQuizStore();

  if (!selectedCandidate?.id) {
    navigate("/quiz_app"); return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6"><BackButton /></div>

        {/* Student chip */}
        <div className="flex items-center gap-3 bg-white rounded-2xl border-2 border-[#2ECC71]/40 px-5 py-3 mb-8 w-fit shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#FFF3CC] overflow-hidden border-2 border-[#FFB800] flex items-center justify-center">
            {selectedCandidate.image
              ? <img src={selectedCandidate.image} alt="" className="w-full h-full object-cover" />
              : <span className="text-xl">{selectedCandidate.gender === "Female" ? "👧" : "👦"}</span>}
          </div>
          <div>
            <p className="font-bold text-[#1A1A2E] leading-none">{selectedCandidate.name}</p>
            <p className="text-xs text-gray-400 font-semibold">{selectedCandidate.class}</p>
          </div>
        </div>

        <h1 className="font-display text-4xl text-[#1A1A2E] mb-2">Choose Exam Type 📋</h1>
        <p className="text-gray-500 font-semibold mb-8">What kind of test do you want to take?</p>

        <div className="flex flex-col gap-5">
          {/* Practice */}
          <button
            onClick={() => { setExamMode('practice'); navigate("/categories"); }}
            className="card-pop bg-[#FFF3CC] border-4 border-[#FFB800] rounded-3xl p-7 text-left hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl mb-3">⚡</div>
            <h2 className="font-display text-3xl text-[#1A1A2E] mb-1">Practice Mode</h2>
            <p className="text-gray-600 font-semibold">Pick <strong>one subject</strong> and answer <strong>15 random questions</strong>. Great for quick revision!</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["🔢 Maths","🔬 Science","🛠️ Tech","✝️ CRS","🌱 Agric","🍳 Home Econ","💼 Business"].map(s => (
                <span key={s} className="text-xs bg-[#FFB800]/20 text-[#cc9200] font-bold px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </button>

          {/* BECE Mock */}
          <button
            onClick={() => { setExamMode('bece'); navigate("/bece-intro"); }}
            className="card-pop bg-[#1A1A2E] border-4 border-[#FFB800] rounded-3xl p-7 text-left hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl mb-3">📋</div>
            <h2 className="font-display text-3xl text-[#FFB800] mb-1">BECE Mock Exam</h2>
            <p className="text-gray-300 font-semibold">Sit a <strong className="text-white">full mock exam</strong> across all 7 BECE subjects. Timed, scored, and just like the real Junior WAEC!</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[
                ["📝", "40 questions per subject"],
                ["⏱️", "45 mins per subject"],
                ["📊", "Full score report"],
                ["🏅", "BECE-style grading"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-1.5 text-gray-300 font-semibold">
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExamModeScreen;
