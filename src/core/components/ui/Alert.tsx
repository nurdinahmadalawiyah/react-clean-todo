import React from "react";

interface AlertProps {
  message: string;
  variant?: "error" | "success" | "warning";
}

export const Alert: React.FC<AlertProps> = ({ message, variant = "error" }) => {
  const variants = {
    error: "bg-red-50 text-red-600 border-red-100",
    success: "bg-green-50 text-green-600 border-green-100",
    warning: "bg-yellow-50 text-yellow-600 border-yellow-100",
  };

  return (
    <div className={`px-5 py-4 rounded-xl text-center border font-medium ${variants[variant]}`}>
      {message}
    </div>
  );
};