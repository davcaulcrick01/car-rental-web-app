import React from 'react'

/** @see https://www.radix-ui.com/primitives/docs/components/checkbox#custom-apis */
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  // Extended for future custom props
}

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
