import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  fullScreen?: boolean
}

export const LoadingSpinner = ({ fullScreen }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center',
        fullScreen && '!h-screen !w-screen'
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-600" />
      </div>
    </div>
  )
}
