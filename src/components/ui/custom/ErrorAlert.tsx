import { AlertCircle } from 'lucide-react'

interface ErrorAlertProps {
  error?: string
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
  if (!error) return null
  return (
    <div className="flex items-start gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
      <AlertCircle className="min-h-4 min-w-4" />
      {error}
    </div>
  )
}
