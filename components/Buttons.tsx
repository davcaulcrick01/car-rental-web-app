// components/Button.tsx
"use client";

import { FC, ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({ className, onClick, icon, children }) => {
  return (
    <button className={`flex items-center gap-2 ${className}`} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
};

export { Button, IconButton };
