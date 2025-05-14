"use client"
// components/UI/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors';
  const variantStyles = {
    primary: 'bg-blue-950 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-blue-950 focus:ring-2 focus:ring-gray-400',
    submit: 'bg-green-500 hover:bg-green-500/80 text-white focus:ring-2 focus:ring-green-500/50',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;