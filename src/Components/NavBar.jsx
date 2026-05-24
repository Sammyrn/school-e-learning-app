import { useNavigate } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b-4 border-[#FFB800]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#FFB800] rounded-xl flex items-center justify-center shadow border-b-4 border-[#cc9200] group-hover:rotate-6 transition-transform">
            <span className="font-display text-lg text-white">A</span>
          </div>
          <span className="font-display text-xl text-[#1A1A2E] hidden sm:block">Arca Dei</span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/quiz_app")} className="btn-bounce flex items-center gap-2 bg-[#2ECC71] text-white font-bold rounded-xl px-4 py-2 border-b-4 border-[#1a9e56] shadow text-sm">
            <BookOpen className="size-4" /><span className="hidden sm:inline">Quiz</span>
          </button>
          <button onClick={() => navigate("/students")} className="btn-bounce flex items-center gap-2 bg-[#3BB4F2] text-white font-bold rounded-xl px-4 py-2 border-b-4 border-[#1a7ab8] shadow text-sm">
            <Users className="size-4" /><span className="hidden sm:inline">Students</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
