import * as React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
  rightIcon?: React.ReactNode
}

function Input({ className, type, rightIcon, ...props }: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'pr-10', // Add padding for the icon
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 flex items-center justify-center text-gray-400">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export { Input }
