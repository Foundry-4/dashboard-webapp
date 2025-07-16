import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { useFormContext, type FieldErrors } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  error?: string
  className?: string
  labelClassName?: string
  errorClassName?: string
  rightIcon?: React.ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      name,
      error,
      className,
      labelClassName,
      errorClassName,
      rightIcon,
      type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    let formErrors: FieldErrors = {}

    try {
      const formContext = useFormContext()
      if (formContext?.formState?.errors) {
        formErrors = formContext.formState.errors
      }
    } catch {}

    const fieldError = (formErrors[name]?.message as string) || error

    // Handle password toggle icon
    const getPasswordIcon = () => {
      if (type !== 'password') return null

      return (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="!bg-transparent !p-0 transition-colors duration-200 hover:!border-transparent hover:text-gray-600 hover:!outline-none focus:!outline-none focus-visible:!outline-none"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      )
    }

    // Determine the final icon and input type
    const finalRightIcon = rightIcon || getPasswordIcon()
    const finalType = type === 'password' && showPassword ? 'text' : type

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Label
            htmlFor={name}
            className={cn('text-sm text-gray-500', labelClassName)}
          >
            {label}
          </Label>
        )}
        <Input
          id={name}
          name={name}
          ref={ref}
          type={finalType}
          className={cn(
            'h-10 outline-none focus-visible:ring-0',
            fieldError && 'border-red-500 focus-visible:border-red-500',
            className
          )}
          aria-invalid={fieldError ? 'true' : 'false'}
          rightIcon={finalRightIcon}
          {...props}
        />
        {fieldError && (
          <span className={cn('text-sm text-red-600', errorClassName)}>
            {fieldError}
          </span>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
