import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  indeterminate,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  indeterminate?: boolean
}) {
  // Set indeterminate on the native input if present
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (ref.current) {
      const input = ref.current.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement | null
      if (input) {
        input.indeterminate = !!indeterminate
      }
    }
  }, [indeterminate])

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      ref={ref}
      className={cn(
        // Use orange for checked, gray for unchecked
        'peer border-2 !border-gray-300 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-gray-400 data-[state=checked]:text-black',
        'dark:bg-input/30',
        'size-4 shrink-0 rounded-[4px] shadow-xs transition-shadow outline-none focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-200',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-black transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
