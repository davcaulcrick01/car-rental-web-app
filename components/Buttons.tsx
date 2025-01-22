// components/Button.tsx
"use client";

import { FC } from 'react';

const Button: FC<{ className?: string; onClick?: () => void }> = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
