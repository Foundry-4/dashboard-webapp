import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Use orange for checked, gray for unchecked
        'peer border-2 !border-gray-300 bg-white data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-400 data-[state=checked]:text-black',
        'dark:bg-input/30',
        'size-4 shrink-0 rounded-[4px] shadow-xs transition-shadow outline-none focus-visible:border-orange-500 focus-visible:ring-[3px] focus-visible:ring-orange-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
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
