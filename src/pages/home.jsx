import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Star, Rocket } from "lucide-react";

const PILLS = [
  { label: "Maths", emoji: "🔢", color: "bg-purple-100 text-purple-700" },
  { label: "Basic Science", emoji: "🔬", color: "bg-green-100 text-green-700" },
  { label: "Basic Tech", emoji: "🛠️", color: "bg-sky-100 text-sky-700" },
  { label: "CRS", emoji: "✝️", color: "bg-indigo-100 text-indigo-700" },
  { label: "Agriculture", emoji: "🌱", color: "bg-lime-100 text-lime-700" },
  { label: "Home Econs", emoji: "🍳", color: "bg-rose-100 text-rose-700" },
  { label: "Business Studies", emoji: "💼", color: "bg-yellow-100 text-yellow-700" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />

      {/* Hero */}
      <section className="dots-bg relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="float absolute top-10 left-8 w-20 h-20 bg-[#FFB800]/20 rounded-full blur-xl" />
          <div className="float-slow absolute top-20 right-12 w-28 h-28 bg-[#2ECC71]/20 rounded-full blur-xl" />

          <div className="fade-in-up inline-flex items-center gap-2 bg-[#FFF3CC] border-2 border-[#FFB800] rounded-full px-5 py-2 mb-6">
            <Star className="size-4 text-[#FFB800] fill-[#FFB800]" />
            <span className="font-bold text-[#cc9200] text-sm">Arca Dei Foundation Schools</span>
            <Star className="size-4 text-[#FFB800] fill-[#FFB800]" />
          </div>

          <h1 className="fade-in-up delay-1 font-display text-5xl sm:text-7xl text-[#1A1A2E] leading-tight mb-4">
            Learn. Quiz. <span className="text-[#FFB800]">Win! 🏆</span>
          </h1>
          <p className="fade-in-up delay-2 text-xl text-gray-600 font-semibold max-w-xl mx-auto mb-10">
            Test your knowledge, track your scores, and earn awesome awards! 🌟
          </p>

          <div className="fade-in-up delay-3 flex flex-wrap gap-4 justify-center mb-12">
            <button onClick={() => navigate("/quiz_app")}
              className="btn-bounce font-display text-2xl bg-[#FFB800] text-[#1A1A2E] px-10 py-4 rounded-3xl border-b-[6px] border-[#cc9200] shadow-xl">
              🚀 Start Quiz!
            </button>
            <button onClick={() => navigate("/students")}
              className="btn-bounce font-display text-2xl bg-white text-[#1A1A2E] px-10 py-4 rounded-3xl border-b-[6px] border-gray-300 shadow-xl">
              👨‍🎓 Students
            </button>
          </div>

          <div className="fade-in-up delay-4 flex flex-wrap gap-3 justify-center">
            {PILLS.map((s) => (
              <span key={s.label} className={`hover-wobble flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm cursor-default ${s.color} border border-current/20`}>
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-display text-4xl text-center text-[#1A1A2E] mb-12">Why you'll love it 😍</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { bg: "bg-[#FFF3CC]", emoji: "⚡", title: "Practice Mode", desc: "Pick any subject and get 15 random questions to sharpen your skills!" },
            { bg: "bg-green-50",  emoji: "📋", title: "BECE Mock Exam", desc: "Sit a full timed mock exam across all 7 BECE subjects — just like the real thing!" },
            { bg: "bg-purple-50", emoji: "👑", title: "Earn Awards",    desc: "Get special awards from your teacher for great performance!" },
          ].map((f) => (
            <div key={f.title} className={`card-pop ${f.bg} rounded-3xl p-8 border-2 border-white shadow-md text-center`}>
              <div className="text-5xl mb-4">{f.emoji}</div>
              <h3 className="font-display text-2xl text-[#1A1A2E] mb-2">{f.title}</h3>
              <p className="text-gray-600 font-semibold">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1A1A2E] mx-4 rounded-3xl p-8 mb-16 max-w-5xl xl:mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
          {[
            { val: "7", label: "BECE Subjects", emoji: "📚" },
            { val: "JSS", label: "All Classes", emoji: "🎒" },
            { val: "100%", label: "Offline", emoji: "📡" },
            { val: "∞", label: "Practice", emoji: "🔁" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-1">{s.emoji}</div>
              <div className="font-display text-4xl text-[#FFB800]">{s.val}</div>
              <div className="text-gray-400 font-semibold text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center px-4 pb-20">
        <div className="inline-block bg-[#FFF3CC] border-4 border-[#FFB800] rounded-3xl p-10 shadow-xl">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="font-display text-4xl text-[#1A1A2E] mb-3">Ready to Begin?</h2>
          <p className="text-gray-600 font-semibold mb-6">Choose Practice or try the BECE Mock Exam!</p>
          <button onClick={() => navigate("/quiz_app")}
            className="btn-bounce font-display text-2xl bg-[#2ECC71] text-white px-10 py-4 rounded-3xl border-b-[6px] border-[#1a9e56] shadow-xl">
            <Rocket className="size-6 inline mr-2" /> Let's Go!
          </button>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-400 font-semibold text-sm border-t border-gray-100">
        © 2026 Arca Dei Foundation Schools · Made with ❤️
      </footer>
    </div>
  );
};
export default HomeScreen;
