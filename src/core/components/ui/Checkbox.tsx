import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox: React.FC<CheckboxProps> = ({ checked, className = "", ...props }) => {
  return (
    <div className={`relative flex items-center justify-center w-7 h-7 shrink-0 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        className="peer absolute w-full h-full opacity-0 cursor-pointer z-10"
        {...props}
      />
      
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
        checked 
          ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200' 
          : 'border-slate-300 bg-slate-50 peer-hover:border-indigo-400'
      }`}>
        {checked && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
};