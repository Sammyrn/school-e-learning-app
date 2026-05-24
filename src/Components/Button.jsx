const Button = ({ children, onClick, className = "", variant = "primary", varient }) => {
  const v = variant || varient || "primary";
  const base = "btn-bounce font-display text-lg px-8 py-3 rounded-2xl cursor-pointer inline-flex items-center justify-center gap-2 border-b-4 focus:outline-none";
  const styles = {
    primary:   "bg-[#FFB800] text-[#1A1A2E] border-[#cc9200] hover:bg-[#ffc933] shadow-lg",
    secondary: "bg-white text-[#1A1A2E] border-gray-300 hover:bg-gray-50 shadow-md",
    green:     "bg-[#2ECC71] text-white border-[#1a9e56] hover:bg-[#3ddb80] shadow-lg",
    danger:    "bg-[#FF6B6B] text-white border-[#cc4444] hover:bg-[#ff8080] shadow-md",
  };
  return (
    <button className={`${base} ${styles[v] || styles.primary} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
