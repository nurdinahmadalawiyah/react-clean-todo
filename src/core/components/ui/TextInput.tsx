import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      
      <input
        className={`
          w-full px-6 py-4 bg-slate-50 border rounded-2xl text-slate-800 
          placeholder-slate-400 outline-none transition-all duration-200
          ${error 
            ? "border-red-300 focus:ring-4 focus:ring-red-500/10 focus:border-red-500" 
            : "border-slate-200/80 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 focus:bg-white"
          }
          shadow-sm ${className}
        `}
        {...props}
      />

      {error && (
        <span className="text-xs font-medium text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};