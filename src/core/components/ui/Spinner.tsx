import React from "react";

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  className = "w-8 h-8 border-4 border-violet-200 border-t-violet-600" 
}) => {
  return (
    <div className={`rounded-full animate-spin ${className}`}></div>
  );
};