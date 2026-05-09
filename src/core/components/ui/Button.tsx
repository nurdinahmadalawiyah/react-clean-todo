import React from "react";

// Mendefinisikan opsi kustom untuk tombol
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants = {
    primary: "bg-violet-900 text-white hover:bg-violet-800 shadow-md",
    secondary: "bg-violet-100 text-violet-700 hover:bg-violet-200 border border-violet-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
    ghost: "bg-transparent text-violet-600 hover:bg-violet-100 hover:text-violet-900",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
};