import { Edit, Trash2, Upload } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

import type { Crop as CropType, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { ModalTemplate } from '@/components/templates/ModalTemplate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ProfileMutations } from '@/services/queries/profile'

interface AvatarUploadProps {
  currentAvatar?: string
  userName?: string
  onAvatarChange?: (newAvatarUrl: string) => void
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export const AvatarUpload = ({
  currentAvatar,
  userName
}: AvatarUploadProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [crop, setCrop] = useState<CropType>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const aspect = 1

  const updateAvatar = ProfileMutations.useUpdateAvatar()
  const deleteAvatar = ProfileMutations.useDeleteAvatar()

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (aspect) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, aspect))
      }
    },
    []
  )

  const resetState = useCallback(() => {
    // Clean up object URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setSelectedFile(null)
    setCrop(undefined)
    setCompletedCrop(undefined)
  }, [previewUrl])

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && file.type.startsWith('image/')) {
        // Reset previous state first
        resetState()

        setSelectedFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setCrop(undefined)
        setCompletedCrop(undefined)
      }
    },
    [resetState]
  )

  const handleCrop = (): Promise<File | null> => {
    return new Promise(resolve => {
      if (!imgRef.current || !completedCrop) {
        resolve(null)
        return
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        resolve(null)
        return
      }

      const scaleX = imgRef.current.naturalWidth / imgRef.current.width
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height

      canvas.width = completedCrop.width * scaleX
      canvas.height = completedCrop.height * scaleY

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      )

      canvas.toBlob(
        blob => {
          if (blob) {
            const croppedFile = new File(
              [blob],
              selectedFile?.name || 'cropped-image.jpg',
              {
                type: 'image/jpeg'
              }
            )
            resolve(croppedFile)
          } else {
            resolve(null)
          }
        },
        'image/jpeg',
        0.9
      )
    })
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      const croppedFile = await handleCrop()
      const fileToUpload = croppedFile || selectedFile

      const response = await updateAvatar.mutateAsync({
        picture: fileToUpload
      })

      if (response.status) {
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
      // Error is already handled by the mutation's onError callback
    }
  }

  const handleDeleteAvatar = async () => {
    try {
      const response = await deleteAvatar.mutateAsync()

      if (response.status) {
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Error deleting avatar:', error)
      // Error is already handled by the mutation's onError callback
    }
  }

  const clearPreviewUrl = useCallback(() => {
    setPreviewUrl(null)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    resetState()
    clearPreviewUrl()
  }, [resetState, clearPreviewUrl])

  const hasImage = useMemo(() => {
    return currentAvatar ? previewUrl !== null : true
  }, [currentAvatar, previewUrl])

  const isUploading = updateAvatar.isPending || deleteAvatar.isPending

  const handleFileInput = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg, image/png, image/jpg, image/webp'
    input.onchange = e => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files[0]) {
        handleFileSelect({
          target
        } as React.ChangeEvent<HTMLInputElement>)
      }
    }
    input.click()
  }, [handleFileSelect])

  useEffect(() => {
    if (currentAvatar && typeof currentAvatar === 'string') {
      if (isOpen && !selectedFile) {
        setPreviewUrl(currentAvatar)
      }
    }
  }, [currentAvatar, isOpen, selectedFile])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetState()
        clearPreviewUrl()
      }, 200)
    }
  }, [isOpen, resetState, clearPreviewUrl])

  return (
    <ModalTemplate
      title="Foto do perfil"
      onClose={handleClose}
      onConfirm={handleUpload}
      open={isOpen && hasImage}
      disableConfirm={!selectedFile}
      onOpenChange={open => {
        setIsOpen(open)
      }}
      confirmText="Salvar"
      isSubmitting={isUploading}
      trigger={
        <Tooltip>
          <TooltipTrigger>
            <div
              className="group relative cursor-pointer"
              onClick={() => {
                if (currentAvatar && typeof currentAvatar === 'string') {
                  setPreviewUrl(currentAvatar)
                  setSelectedFile(null)
                }
                setIsOpen(true)
              }}
            >
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={currentAvatar}
                  className="object-cover"
                />
                <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <TooltipContent>
                <p>{currentAvatar ? 'Atualizar foto' : 'Adicionar foto'}</p>
              </TooltipContent>
            </div>
          </TooltipTrigger>
        </Tooltip>
      }
      extraModalActions={
        <>
          {currentAvatar && (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleDeleteAvatar}
              disabled={isUploading}
            >
              <Trash2 className="h-4 w-4" />
              Remover foto
            </Button>
          )}
          {currentAvatar && (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleFileInput}
              disabled={isUploading}
            >
              <Edit className="h-4 w-4" />
              Atualizar foto
            </Button>
          )}
        </>
      }
    >
      <div className="min-h-2/3 min-w-2/3">
        <div className="flex justify-center">
          <div className="relative">
            {!currentAvatar && !previewUrl && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-6">
                <p className="text-base">Adicione uma foto de perfil</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={handleFileInput}
                  disabled={isUploading}
                >
                  <Edit className="h-4 w-4" />
                  Carregar foto
                </Button>
              </div>
            )}
            {previewUrl ? (
              selectedFile ? (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={c => setCompletedCrop(c)}
                  aspect={aspect}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    src={previewUrl || ''}
                    alt="Crop preview"
                    className="max-h-full max-w-full"
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              ) : (
                <img
                  src={previewUrl || currentAvatar}
                  alt="Avatar preview"
                  className="max-h-full max-w-full"
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </ModalTemplate>
  )
}
