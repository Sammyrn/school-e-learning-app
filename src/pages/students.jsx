import useStudentsStore from "../store/studentsStore";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { Crown, UserPlus } from "lucide-react";

const StudentsScreen = () => {
  const { students } = useStudentsStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl text-[#1A1A2E]">Our Students 🎓</h1>
            <p className="text-gray-500 font-semibold mt-1">{students.length} student{students.length !== 1 ? "s" : ""} registered</p>
          </div>
          <button onClick={() => navigate("/add-student")}
            className="btn-bounce flex items-center gap-2 bg-[#FFB800] text-[#1A1A2E] font-display text-lg px-6 py-3 rounded-2xl border-b-4 border-[#cc9200] shadow-lg">
            <UserPlus className="size-5" /> Add Student
          </button>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-7xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="font-display text-3xl text-gray-400 mb-2">No students yet!</h3>
            <button onClick={() => navigate("/add-student")}
              className="btn-bounce font-display text-xl bg-[#FFB800] text-[#1A1A2E] px-8 py-3 rounded-2xl border-b-4 border-[#cc9200] shadow-lg">
              + Add First Student
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {students.map((student, i) => {
              const awardCount = (student.awards || []).length;
              const history = student.quizHistory || [];
              const avg = history.length ? Math.round(history.reduce((s, e) => s + e.percentage, 0) / history.length) : null;
              const beceCount = (student.beceHistory || []).length;
              const isFemale = student.gender === "Female";
              return (
                <div key={student.id} onClick={() => navigate(`/student/${student.id}`)}
                  className={`card-pop relative cursor-pointer rounded-3xl border-2 p-5 flex flex-col items-center gap-3 fade-in-up ${isFemale ? "bg-pink-50 border-pink-200" : "bg-sky-50 border-sky-200"}`}
                  style={{ animationDelay: `${i * 0.06}s` }}>
                  {awardCount > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#FFB800] text-[#1A1A2E] text-xs font-bold px-2 py-0.5 rounded-full shadow">
                      <Crown className="size-3" />{awardCount}
                    </div>
                  )}
                  <div className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-4 border-white shadow-md ${isFemale ? "bg-pink-100" : "bg-sky-100"}`}>
                    {student.image
                      ? <img src={student.image} alt={student.name} className="w-full h-full object-cover" />
                      : <span className="text-3xl">{isFemale ? "👧" : "👦"}</span>}
                  </div>
                  <div className="text-center">
                    <p className={`font-display text-lg leading-tight ${isFemale ? "text-pink-700" : "text-sky-700"}`}>{student.name}</p>
                    <span className="inline-block mt-1 bg-white/70 text-gray-600 font-bold text-xs px-3 py-0.5 rounded-full">{student.class}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                    {avg !== null && <span>📊 {avg}%</span>}
                    {beceCount > 0 && <span>📋 {beceCount} BECE</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentsScreen;
