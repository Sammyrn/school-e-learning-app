import { ChevronLeft } from "lucide-react";
const BackButton = ({ onClick }) => (
  <button
    onClick={onClick || (() => window.history.back())}
    className="btn-bounce inline-flex items-center gap-1.5 bg-white border-2 border-gray-200 text-[#1A1A2E] font-bold rounded-2xl px-4 py-2 shadow-sm hover:border-[#FFB800] hover:bg-[#FFF3CC] transition-colors cursor-pointer"
  >
    <ChevronLeft className="size-5" />
    <span className="font-display text-base">Back</span>
  </button>
);
export default BackButton;
