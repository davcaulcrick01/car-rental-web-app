import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={`form-checkbox text-blue-600 focus:ring-blue-500 ${className}`}
        {...props}
      />
    )
  }
)

Checkbox.displayName = "Checkbox"
