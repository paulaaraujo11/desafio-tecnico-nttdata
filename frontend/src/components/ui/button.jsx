import React from "react";

export const Button = ({ children, className = "", variant = "default", ...props }) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition duration-200";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
