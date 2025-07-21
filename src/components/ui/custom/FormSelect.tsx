import { Controller, useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface Option {
  value: number | string
  label: string
}

interface FormSelectProps {
  name: string
  label?: string
  options: Option[]
  placeholder?: string
  className?: string
  labelClassName?: string
  errorClassName?: string
  disabled?: boolean
}

export const FormSelect = ({
  name,
  label,
  options,
  placeholder,
  className,
  labelClassName,
  errorClassName,
  disabled
}: FormSelectProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

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
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select
              value={field.value ?? ''}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className={cn('w-full', className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.label}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }}
      />
      {errors[name]?.message && (
        <span className={cn('text-sm text-red-600', errorClassName)}>
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  )
}
