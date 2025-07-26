import { Loader2 } from 'lucide-react'

import { Button } from '../ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

interface ModalTemplateProps {
  title: string
  description?: string
  children: React.ReactNode
  open: boolean
  trigger?: React.ReactNode
  extraModalActions?: React.ReactNode
  isSubmitting?: boolean
  disableConfirm?: boolean
  titleIcon?: React.ReactNode
  confirmText?: string
  cancelText?: string
  onClose: () => void
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
}

export const ModalTemplate = ({
  title,
  description,
  children,
  open,
  trigger,
  extraModalActions,
  isSubmitting,
  titleIcon,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
  onOpenChange,
  disableConfirm
}: ModalTemplateProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="rounded-sm px-0 py-4">
        <DialogHeader className="px-4 pb-2">
          <DialogTitle className="flex items-center gap-2">
            {titleIcon}
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="px-4">{children}</div>

        <Separator />

        <DialogFooter className="flex w-full flex-row items-center px-4">
          {extraModalActions}

          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            {cancelText || 'Cancelar'}
          </Button>
          <Button
            size="sm"
            onClick={onConfirm}
            disabled={isSubmitting || disableConfirm}
            className="relative"
          >
            {confirmText || 'Confirmar'}
            {isSubmitting && (
              <Loader2 className="absolute left-[calc(50%-8px)] h-4 w-4 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
