import { Upload } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'

import type { Crop as CropType, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { ModalTemplate } from '@/components/common/ModalTemplate'
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
  const aspect = 1 // Square aspect ratio for avatar

  const updateAvatar = ProfileMutations.useUpdateAvatar()

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (aspect) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, aspect))
      }
    },
    []
  )

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      // Reset previous state first
      resetState()

      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setCrop(undefined)
      setCompletedCrop(undefined)

      // Open the dialog after file selection
      setIsOpen(true)
    }
  }

  const handleCrop = () => {
    if (!imgRef.current || !completedCrop) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

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
          setSelectedFile(croppedFile)
        }
      },
      'image/jpeg',
      0.9
    )
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    handleCrop()

    try {
      const response = await updateAvatar.mutateAsync({
        picture: selectedFile
      })

      if (response.status) {
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  const resetState = () => {
    // Clean up object URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setSelectedFile(null)
    setCrop(undefined)
    setCompletedCrop(undefined)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (currentAvatar && typeof currentAvatar === 'string') {
      if (isOpen && !previewUrl) {
        setPreviewUrl(currentAvatar)
      }
    }
  }, [currentAvatar, isOpen, previewUrl])

  return (
    <ModalTemplate
      title="Foto do perfil"
      onClose={handleClose}
      onConfirm={handleUpload}
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open)
        if (!open) {
          resetState()
          // Clear preview URL after modal is closed
          // setTimeout(clearPreviewUrl, 1000)
        }
      }}
      isSubmitting={updateAvatar.isPending}
      trigger={
        <div className="group relative cursor-pointer">
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
        </div>
      }
      extraModalActions={
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => {
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
          }}
        >
          Alterar foto
        </Button>
      }
    >
      <div className="min-h-2/3 min-w-2/3">
        <div className="flex justify-center">
          <div className="relative">
            {previewUrl && (
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
            )}
          </div>
        </div>
      </div>
    </ModalTemplate>
  )
}
