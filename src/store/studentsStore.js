import { create } from "zustand";

const AWARDS_PASSWORD = "admin1234";

const useStudentsStore = create((set, get) => ({
  students: [],

  addStudent: (student) => {
    const updated = [...get().students, student];
    set({ students: updated });
    localStorage.setItem("students", JSON.stringify(updated));
  },

  setStudents: (students) => set({ students }),

  loadStudentsFromStorage: () => {
    const saved = localStorage.getItem("students");
    if (saved) set({ students: JSON.parse(saved) });
  },

  saveQuizResult: (studentId, { subject, score, total, percentage, mode = 'practice' }) => {
    const updated = get().students.map((s) => {
      if (s.id != studentId) return s;
      return {
        ...s,
        quizHistory: [
          ...(s.quizHistory || []),
          { id: crypto.randomUUID(), subject, score, total, percentage, mode, date: new Date().toISOString() },
        ],
      };
    });
    set({ students: updated });
    localStorage.setItem("students", JSON.stringify(updated));
  },

  saveBECEResult: (studentId, beceResults) => {
    // beceResults: { mathematics: { score, total, percentage }, ... }
    const overall = Object.values(beceResults);
    const totalScore = overall.reduce((a, b) => a + b.score, 0);
    const totalQs = overall.reduce((a, b) => a + b.total, 0);
    const pct = Math.round((totalScore / totalQs) * 100);
    const updated = get().students.map((s) => {
      if (s.id != studentId) return s;
      return {
        ...s,
        beceHistory: [
          ...(s.beceHistory || []),
          {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            subjects: beceResults,
            totalScore,
            totalQuestions: totalQs,
            percentage: pct,
          },
        ],
      };
    });
    set({ students: updated });
    localStorage.setItem("students", JSON.stringify(updated));
  },

  giveAward: (studentId, { title, description }) => {
    const updated = get().students.map((s) => {
      if (s.id != studentId) return s;
      return {
        ...s,
        awards: [
          ...(s.awards || []),
          { id: crypto.randomUUID(), title, description, date: new Date().toISOString() },
        ],
      };
    });
    set({ students: updated });
    localStorage.setItem("students", JSON.stringify(updated));
  },

  removeAward: (studentId, awardId) => {
    const updated = get().students.map((s) => {
      if (s.id != studentId) return s;
      return { ...s, awards: (s.awards || []).filter((a) => a.id !== awardId) };
    });
    set({ students: updated });
    localStorage.setItem("students", JSON.stringify(updated));
  },

  checkAwardsPassword: (input) => input === AWARDS_PASSWORD,
}));

export default useStudentsStore;
