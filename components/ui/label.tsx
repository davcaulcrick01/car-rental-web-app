// components/ui/label.tsx
import { FC } from 'react';

const Label: FC<{ htmlFor: string; className?: string }> = ({ htmlFor, className = '', children }) => {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-900 ${className}`}>
      {children}
    </label>
  );
};

export { Label };
