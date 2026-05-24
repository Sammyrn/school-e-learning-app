import { useState } from "react";
import statesData from "../data/state.json";
import useStudentsStore from "../store/studentsStore";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import BackButton from "../Components/BackButton";
import { Camera, Save } from "lucide-react";

const classes = ["JSS1","JSS2","JSS3"];
const toBase64 = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
const cls = "w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 font-semibold text-[#1A1A2E] focus:outline-none focus:border-[#FFB800] transition-colors";

const AddStudentScreen = () => {
  const { addStudent } = useStudentsStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"",class:"",image:"",dateOfBirth:"",gender:"",parentPhone:"",stateOfOrigin:"",lGA:"" });
  const lgas = statesData.find((s) => s.name === form.stateOfOrigin)?.lgas || [];

  const handleImg = async (e) => {
    const file = e.target.files[0];
    if (file) setForm((p) => ({ ...p, image: "" })) || (async () => {
      const b = await toBase64(file); setForm((p) => ({ ...p, image: b }));
    })();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setForm((p) => ({ ...p, image: base64 }));
  };

  const save = () => {
    if (!form.name.trim() || !form.class) return alert("Please enter the student's name and class!");
    addStudent({ id: crypto.randomUUID(), ...form, quizHistory:[], awards:[], beceHistory:[] });
    navigate("/students");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <NavBar />
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <BackButton /><h1 className="font-display text-3xl text-[#1A1A2E]">New Student ✏️</h1>
        </div>
        <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-lg p-6 flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <label className="cursor-pointer group relative">
              <div className="w-28 h-28 rounded-full bg-[#FFF3CC] border-4 border-[#FFB800] overflow-hidden flex items-center justify-center shadow-lg group-hover:opacity-80 transition-opacity">
                {form.image ? <img src={form.image} alt="" className="w-full h-full object-cover" /> : <span className="text-5xl">👤</span>}
              </div>
              <div className="absolute bottom-0 right-0 bg-[#FFB800] rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow">
                <Camera className="size-4 text-white" />
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <span className="text-sm text-gray-400 font-semibold">Tap to add photo</span>
          </div>

          {[
            { label:"🧑 Full Name", type:"text", key:"name", placeholder:"e.g. Amara Johnson" },
            { label:"📞 Parent's Phone", type:"tel", key:"parentPhone", placeholder:"e.g. 08012345678" },
            { label:"🎂 Date of Birth", type:"date", key:"dateOfBirth", placeholder:"" },
          ].map(({ label, type, key, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="font-display text-base text-[#1A1A2E]">{label}</label>
              <input type={type} placeholder={placeholder} className={cls} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            {[
              { label:"🎒 Class", key:"class", options: classes.map(c=>({v:c,l:c})) },
              { label:"🙋 Gender", key:"gender", options:[{v:"Male",l:"Male"},{v:"Female",l:"Female"}] },
            ].map(({ label, key, options }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="font-display text-base text-[#1A1A2E]">{label}</label>
                <select className={cls} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}>
                  <option value="">Select…</option>
                  {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display text-base text-[#1A1A2E]">🗺️ State of Origin</label>
            <select className={cls} value={form.stateOfOrigin} onChange={(e) => setForm({ ...form, stateOfOrigin: e.target.value, lGA: "" })}>
              <option value="">Select state…</option>
              {statesData.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-display text-base text-[#1A1A2E]">📍 Local Government</label>
            <select className={cls} value={form.lGA} disabled={!lgas.length} onChange={(e) => setForm({ ...form, lGA: e.target.value })}>
              <option value="">Select LGA…</option>
              {lgas.map((lg) => <option key={lg} value={lg}>{lg}</option>)}
            </select>
          </div>

          <button onClick={save}
            className="btn-bounce w-full bg-[#2ECC71] text-white font-display text-xl py-4 rounded-2xl border-b-4 border-[#1a9e56] shadow-lg flex items-center justify-center gap-2 mt-2">
            <Save className="size-5" /> Save Student 🎉
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddStudentScreen;
