import type React from "react";

export const TodoHeader: React.FC = () => {
  return (
    <div className="pt-12 pb-8 px-12 border-b border-slate-100">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-slate-900 via-violet-800 to-slate-900 tracking-tight">
        Tasks.
      </h1>
      <p className="text-slate-500 mt-2.5 font-medium text-sm sm:text-base tracking-wide">
        Selesaikan hari ini, istirahat esok hari.
      </p>
    </div>
  );
};