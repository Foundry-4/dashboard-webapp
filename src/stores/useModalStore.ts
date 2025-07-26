import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConfirm: (() => void) | null
  onCancel: (() => void) | null
  isDestructive: boolean
  isLoading: boolean
  openModal: (params: {
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel?: () => void
    isDestructive?: boolean
  }) => void
  closeModal: () => void
  clearContent: () => void
  setLoading: (loading: boolean) => void
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  onConfirm: null,
  onCancel: null,
  isDestructive: false,
  isLoading: false,

  openModal: ({
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    isDestructive = false
  }) =>
    set({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      isDestructive
    }),

  closeModal: () =>
    set({
      isOpen: false
    }),

  clearContent: () =>
    set({
      title: '',
      message: '',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm: null,
      onCancel: null,
      isDestructive: false,
      isLoading: false
    }),

  setLoading: (loading: boolean) => set({ isLoading: loading })
}))
