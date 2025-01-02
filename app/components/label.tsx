import { LabelHTMLAttributes } from 'react';

// Define props for your Label component
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
}

export function Label({ children, htmlFor, className, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-gray-700 font-semibold ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
