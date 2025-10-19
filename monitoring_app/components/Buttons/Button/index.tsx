import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  type = 'button',
  onClick,
  disabled = false,
  children,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-6 py-2 rounded-lg bg-blue text-white font-semibold shadow-md transition-all duration-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
