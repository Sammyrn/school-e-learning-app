import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import useStudentsStore from "../../store/studentsStore";
import { useQuizStore } from "../../store/quizStore";

const LandingPage = () => {
  const navigate = useNavigate();
  const { students } = useStudentsStore();
  const setSelectedCandidate = useQuizStore((s) => s.setSelectedCandidate);

  const handleSelect = (student) => {
    setSelectedCandidate(student);
    navigate("/exam-mode");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4 float">🎓</div>
          <h1 className="font-display text-5xl text-[#1A1A2E] mb-2">Who's Taking the Quiz?</h1>
          <p className="text-gray-500 font-semibold text-lg">Pick your name from the list below!</p>
        </div>

        {students.length === 0 ? (
          <div className="text-center bg-white rounded-3xl border-4 border-dashed border-[#FFB800] p-16">
            <div className="text-6xl mb-4">👀</div>
            <h3 className="font-display text-3xl text-gray-400 mb-2">No students yet!</h3>
            <p className="text-gray-400 font-semibold mb-6">Ask your teacher to add students first.</p>
            <button onClick={() => navigate("/add-student")}
              className="btn-bounce font-display text-xl bg-[#FFB800] text-[#1A1A2E] px-8 py-3 rounded-2xl border-b-4 border-[#cc9200] shadow-lg">
              Add a Student
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {students.map((student, i) => (
              <button key={student.id} onClick={() => handleSelect(student)}
                className="card-pop bg-white rounded-3xl border-2 border-gray-100 p-5 flex flex-col items-center gap-3 text-center fade-in-up"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="w-20 h-20 rounded-full bg-[#FFF3CC] overflow-hidden border-4 border-[#FFB800] flex items-center justify-center shadow">
                  {student.image
                    ? <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                    : <span className="text-4xl">{student.gender === "Female" ? "👧" : "👦"}</span>}
                </div>
                <div>
                  <p className="font-display text-lg text-[#1A1A2E] leading-tight">{student.name}</p>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-0.5 rounded-full">{student.class}</span>
                </div>
                <span className="text-[#2ECC71] font-bold text-sm">Tap to start →</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default LandingPage;
