import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStudentsStore from "../store/studentsStore";
import NavBar from "../Components/NavBar";
import BackButton from "../Components/BackButton";
import { Crown, Plus, X, Lock, Trash2, BookOpen, TrendingUp, ClipboardList } from "lucide-react";
import { BECE_SUBJECTS } from "../helper/questionHelper";

const SUBJECT_MAP = Object.fromEntries(BECE_SUBJECTS.map((s) => [s.id, `${s.emoji} ${s.name}`]));

const AWARD_PRESETS = ["🏆 Best Student","📈 Most Improved","✅ Perfect Attendance","⭐ Class Captain",
  "🔬 Subject Excellence","🏅 Sports Champion","🎨 Art Award","🧪 Science Fair Winner","📚 Best Reader","🤝 Most Helpful"];

const scoreTier = (pct) => {
  if (pct >= 75) return { bg:"bg-green-100",  text:"text-green-700",  bar:"bg-green-500",  emoji:"🌟", grade:"A1" };
  if (pct >= 65) return { bg:"bg-blue-100",   text:"text-blue-700",   bar:"bg-blue-500",   emoji:"👍", grade:"B2" };
  if (pct >= 60) return { bg:"bg-blue-100",   text:"text-blue-700",   bar:"bg-blue-500",   emoji:"👍", grade:"B3" };
  if (pct >= 50) return { bg:"bg-teal-100",   text:"text-teal-700",   bar:"bg-teal-500",   emoji:"💪", grade:"C5" };
  if (pct >= 40) return { bg:"bg-yellow-100", text:"text-yellow-700", bar:"bg-yellow-500", emoji:"💪", grade:"D7" };
  return              { bg:"bg-red-100",   text:"text-red-700",   bar:"bg-red-500",   emoji:"📝", grade:"F9" };
};

const fmt = (iso) => new Date(iso).toLocaleDateString("en-NG", { day:"numeric", month:"short", year:"numeric" });

// ── Password modal ──
const PasswordModal = ({ onSuccess, onClose }) => {
  const { checkAwardsPassword } = useStudentsStore();
  const [val, setVal] = useState(""); const [err, setErr] = useState("");
  const submit = () => checkAwardsPassword(val) ? onSuccess() : (setErr("Wrong password! 🔒"), setVal(""));
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm border-4 border-[#FFB800]">
        <div className="text-center mb-4"><div className="text-5xl mb-2">🔐</div>
          <h3 className="font-display text-2xl">Awards Password</h3>
          <p className="text-gray-500 font-semibold text-sm mt-1">Only teachers can give awards!</p></div>
        <input type="password" placeholder="Enter password…" value={val} autoFocus
          onChange={(e) => { setVal(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="w-full border-2 border-gray-200 rounded-2xl p-3 font-semibold text-center text-lg mb-2 focus:outline-none focus:border-[#FFB800]" />
        {err && <p className="text-red-500 text-sm font-bold text-center mb-2">{err}</p>}
        <div className="flex gap-3 mt-2">
          <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-600 font-bold rounded-2xl py-3 border-b-4 border-gray-200">Cancel</button>
          <button onClick={submit} className="btn-bounce flex-1 bg-[#FFB800] text-[#1A1A2E] font-display text-lg rounded-2xl py-3 border-b-4 border-[#cc9200]">Unlock 🔓</button>
        </div>
      </div>
    </div>
  );
};

// ── Award modal ──
const AwardModal = ({ studentId, onClose }) => {
  const { giveAward } = useStudentsStore();
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState("");
  const submit = () => { if (!title.trim()) return; giveAward(studentId, { title: title.trim(), description: desc.trim() }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm border-4 border-[#FFB800]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl text-[#1A1A2E]">🏆 Give an Award!</h3>
          <button onClick={onClose}><X className="size-5 text-gray-400" /></button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {AWARD_PRESETS.map((p) => (
            <button key={p} onClick={() => setTitle(p)}
              className={`text-sm px-3 py-1.5 rounded-full border-2 font-bold transition-all ${title===p?"bg-[#FFB800] border-[#FFB800] text-[#1A1A2E]":"border-gray-200 text-gray-600 hover:border-[#FFB800]"}`}>{p}</button>
          ))}
        </div>
        <input type="text" placeholder="Or type custom title…" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-2xl p-3 font-semibold mb-3 focus:outline-none focus:border-[#FFB800]" />
        <textarea placeholder="Note (optional)" value={desc} onChange={(e) => setDesc(e.target.value)} rows={2}
          className="w-full border-2 border-gray-200 rounded-2xl p-3 font-semibold mb-4 resize-none focus:outline-none focus:border-[#FFB800]" />
        <button onClick={submit} disabled={!title.trim()}
          className="btn-bounce w-full bg-[#FFB800] text-[#1A1A2E] font-display text-xl rounded-2xl py-3 border-b-4 border-[#cc9200] disabled:opacity-40">Award! 🎉</button>
      </div>
    </div>
  );
};

// ── Main ──
const StudentDetailsScreen = () => {
  const { id } = useParams(); const navigate = useNavigate();
  const { students, removeAward } = useStudentsStore();
  const student = students.find((s) => s.id == id);
  const [showPwd, setShowPwd] = useState(false);
  const [showAward, setShowAward] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("practice"); // "practice" | "bece"

  if (!student) return <div className="min-h-screen bg-[#FFFBF0]"><NavBar /><div className="p-8"><BackButton /><p className="mt-4 text-gray-500 font-semibold">Student not found.</p></div></div>;

  const age = student.dateOfBirth ? new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear() : null;
  const history = student.quizHistory || [];
  const awards = student.awards || [];
  const beceHistory = student.beceHistory || [];

  const subjectStats = history.reduce((acc, e) => {
    if (!acc[e.subject]) acc[e.subject] = { attempts:0, total:0, best:0 };
    acc[e.subject].attempts++; acc[e.subject].total += e.percentage;
    acc[e.subject].best = Math.max(acc[e.subject].best, e.percentage);
    return acc;
  }, {});

  const avgPractice = history.length ? Math.round(history.reduce((s,e) => s+e.percentage, 0)/history.length) : null;
  const avgBece = beceHistory.length ? Math.round(beceHistory.reduce((s,e) => s+e.percentage, 0)/beceHistory.length) : null;

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      {showPwd && <PasswordModal onSuccess={() => { setUnlocked(true); setShowPwd(false); setShowAward(true); }} onClose={() => setShowPwd(false)} />}
      {showAward && <AwardModal studentId={student.id} onClose={() => setShowAward(false)} />}

      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <BackButton />

        {/* Profile */}
        <div className={`rounded-3xl border-4 p-6 flex gap-5 items-center ${student.gender==="Female"?"bg-pink-50 border-pink-200":"bg-sky-50 border-sky-200"}`}>
          <div className="w-24 h-24 rounded-full bg-white overflow-hidden flex items-center justify-center border-4 border-white shadow-lg shrink-0">
            {student.image ? <img src={student.image} alt={student.name} className="w-full h-full object-cover" /> : <span className="text-5xl">{student.gender==="Female"?"👧":"👦"}</span>}
          </div>
          <div>
            <h1 className="font-display text-3xl text-[#1A1A2E]">{student.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {[["🎒",student.class],[age&&"🎂",age&&`Age ${age}`],[student.gender&&(student.gender==="Female"?"👧":"👦"),student.gender],[student.stateOfOrigin&&"🗺️",student.stateOfOrigin],[student.parentPhone&&"📞",student.parentPhone]].map(([icon,val])=>val&&(
                <span key={val} className="bg-white font-bold text-sm text-gray-600 px-3 py-1 rounded-full border border-gray-200">{icon} {val}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Score banners */}
        <div className="grid grid-cols-2 gap-3">
          {avgPractice!==null && (() => { const t=scoreTier(avgPractice); return (
            <div className={`rounded-2xl p-4 ${t.bg} border-2 border-white shadow-sm text-center`}>
              <p className="font-bold text-gray-500 text-xs">Practice Avg</p>
              <p className={`font-display text-3xl ${t.text}`}>{avgPractice}% {t.emoji}</p>
              <p className={`text-xs font-bold ${t.text}`}>{history.length} quizzes</p>
            </div>
          );})()}
          {avgBece!==null && (() => { const t=scoreTier(avgBece); return (
            <div className={`rounded-2xl p-4 ${t.bg} border-2 border-white shadow-sm text-center`}>
              <p className="font-bold text-gray-500 text-xs">BECE Mock Avg</p>
              <p className={`font-display text-3xl ${t.text}`}>{avgBece}% {t.emoji}</p>
              <p className={`text-xs font-bold ${t.text}`}>{beceHistory.length} mocks</p>
            </div>
          );})()}
        </div>

        {/* Awards */}
        <div className="bg-white rounded-3xl border-2 border-[#FFB800]/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-[#1A1A2E] flex items-center gap-2"><Crown className="size-6 text-[#FFB800]"/>Awards</h2>
            <button onClick={() => unlocked ? setShowAward(true) : setShowPwd(true)}
              className="btn-bounce flex items-center gap-1.5 bg-[#FFB800] text-[#1A1A2E] font-bold text-sm px-4 py-2 rounded-xl border-b-4 border-[#cc9200] shadow">
              {unlocked ? <Plus className="size-4"/> : <Lock className="size-4"/>} Give Award
            </button>
          </div>
          {awards.length===0 ? (
            <div className="text-center py-6 text-gray-400"><div className="text-4xl mb-2">🏅</div><p className="font-bold">No awards yet!</p></div>
          ) : awards.map((a) => (
            <div key={a.id} className="flex items-center gap-3 bg-[#FFF3CC] border-2 border-[#FFB800]/40 rounded-2xl p-4 mb-2">
              <div className="w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center shrink-0 text-xl">🏆</div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg text-[#1A1A2E]">{a.title}</p>
                {a.description && <p className="text-sm text-gray-500 font-semibold">{a.description}</p>}
                <p className="text-xs text-[#cc9200] font-bold">{fmt(a.date)}</p>
              </div>
              {unlocked && <button onClick={() => removeAward(student.id, a.id)}><Trash2 className="size-4 text-gray-300 hover:text-red-400"/></button>}
            </div>
          ))}
        </div>

        {/* History tabs */}
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-5">
          <div className="flex gap-2 mb-5">
            <button onClick={() => setTab("practice")}
              className={`flex-1 font-display text-lg py-2.5 rounded-2xl border-b-4 transition-all ${tab==="practice"?"bg-[#FFB800] text-[#1A1A2E] border-[#cc9200]":"bg-gray-100 text-gray-500 border-gray-200"}`}>
              ⚡ Practice
            </button>
            <button onClick={() => setTab("bece")}
              className={`flex-1 font-display text-lg py-2.5 rounded-2xl border-b-4 transition-all ${tab==="bece"?"bg-[#1A1A2E] text-[#FFB800] border-[#FFB800]":"bg-gray-100 text-gray-500 border-gray-200"}`}>
              📋 BECE Mocks
            </button>
          </div>

          {tab === "practice" && (
            <>
              {/* Subject bars */}
              {Object.keys(subjectStats).length > 0 && (
                <div className="mb-5">
                  <h3 className="font-display text-xl text-[#1A1A2E] mb-3 flex items-center gap-2"><TrendingUp className="size-5 text-[#2ECC71]"/>By Subject</h3>
                  {Object.entries(subjectStats).map(([subj,stats]) => {
                    const avg = Math.round(stats.total/stats.attempts); const t = scoreTier(avg);
                    return (
                      <div key={subj} className={`rounded-2xl p-4 mb-2 ${t.bg}`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-bold text-sm ${t.text}`}>{SUBJECT_MAP[subj]||subj}</span>
                          <span className="text-xs text-gray-500 font-bold">Best: {stats.best}% · {stats.attempts} tries</span>
                        </div>
                        <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${t.bar}`} style={{width:`${avg}%`}}/>
                        </div>
                        <p className={`text-xs font-bold mt-1 ${t.text}`}>Avg: {avg}%</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <h3 className="font-display text-xl text-[#1A1A2E] mb-3 flex items-center gap-2"><BookOpen className="size-5 text-[#3BB4F2]"/>History</h3>
              {history.length===0 ? (
                <div className="text-center py-8 text-gray-400"><div className="text-5xl mb-2">📝</div><p className="font-bold mb-4">No practice quizzes yet!</p>
                  <button onClick={() => navigate("/quiz_app")} className="btn-bounce font-display text-lg bg-[#FFB800] text-[#1A1A2E] px-6 py-2.5 rounded-2xl border-b-4 border-[#cc9200] shadow">Start a Quiz! 🚀</button></div>
              ) : [...history].reverse().map((e) => { const t=scoreTier(e.percentage); return (
                <div key={e.id} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border-2 border-gray-100 mb-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${t.bg} border-2 border-white shadow-sm`}>
                    <span className="font-display text-lg">{e.percentage}%</span></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1A1A2E] text-sm truncate">{SUBJECT_MAP[e.subject]||e.subject}</p>
                    <p className="text-xs text-gray-400 font-semibold">{e.score}/{e.total} correct · {fmt(e.date)}</p>
                  </div>
                  <span className="text-xl">{t.emoji}</span>
                </div>
              );})}
            </>
          )}

          {tab === "bece" && (
            <>
              {beceHistory.length===0 ? (
                <div className="text-center py-8 text-gray-400"><div className="text-5xl mb-2">📋</div><p className="font-bold mb-4">No BECE mocks taken yet!</p>
                  <button onClick={() => navigate("/quiz_app")} className="btn-bounce font-display text-lg bg-[#1A1A2E] text-[#FFB800] px-6 py-2.5 rounded-2xl border-b-4 border-[#FFB800] shadow">Start a Mock Exam! 📋</button></div>
              ) : [...beceHistory].reverse().map((entry) => {
                const t = scoreTier(entry.percentage);
                return (
                  <div key={entry.id} className="bg-gray-50 rounded-2xl border-2 border-gray-100 p-4 mb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-lg text-[#1A1A2E]">BECE Mock</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-display text-xl ${t.text}`}>{entry.percentage}% {t.grade}</span>
                        <span className="text-xs text-gray-400 font-bold">{fmt(entry.date)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {entry.subjects && Object.entries(entry.subjects).map(([subj, r]) => {
                        const st = scoreTier(r.percentage);
                        return (
                          <div key={subj} className={`flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-bold ${st.bg}`}>
                            <span className={st.text}>{SUBJECT_MAP[subj]?.split(" ").slice(0,2).join(" ")||subj}</span>
                            <span className={st.text}>{r.percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default StudentDetailsScreen;
