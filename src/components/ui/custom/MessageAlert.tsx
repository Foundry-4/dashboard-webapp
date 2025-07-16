import { CheckCircle } from 'lucide-react'

interface MessageAlertProps {
  message?: string
}

export const MessageAlert = ({ message }: MessageAlertProps) => {
  if (!message) return null
  return (
    <div className="flex items-start gap-2 rounded-md bg-green-50 p-3 text-sm text-green-600">
      <CheckCircle className="min-h-4 min-w-4" />
      {message}
    </div>
  )
}
