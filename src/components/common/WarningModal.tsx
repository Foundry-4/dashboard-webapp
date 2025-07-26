import { AlertTriangle } from 'lucide-react'

import { ModalTemplate } from '@/components/templates/ModalTemplate'
import { useModalStore } from '@/stores/useModalStore'

export const WarningModal = () => {
  const {
    isOpen,
    title,
    message,
    isLoading,
    isDestructive,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    closeModal,
    clearContent,
    setLoading
  } = useModalStore()

  const handleConfirm = async () => {
    if (!onConfirm) return

    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
      closeModal()
      // Clear content after animation completes (approximately 300ms for shadcn/ui dialog)
      setTimeout(() => {
        clearContent()
      }, 300)
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    closeModal()
    // Clear content after animation completes (approximately 300ms for shadcn/ui dialog)
    setTimeout(() => {
      clearContent()
    }, 300)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal()
      // Clear content after animation completes (approximately 300ms for shadcn/ui dialog)
      setTimeout(() => {
        clearContent()
      }, 300)
    }
  }

  return (
    <ModalTemplate
      title={title}
      open={isOpen}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      onOpenChange={handleOpenChange}
      isSubmitting={isLoading}
      disableConfirm={isLoading}
      confirmText={confirmText}
      cancelText={cancelText}
      titleIcon={
        isDestructive && <AlertTriangle className="text-destructive h-5 w-5" />
      }
    >
      <p className="text-muted-foreground text-sm">{message}</p>
    </ModalTemplate>
  )
}
