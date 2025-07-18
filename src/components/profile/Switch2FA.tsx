import { Skeleton } from '../ui/skeleton'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ProfileMutations } from '@/services/queries/profile'

interface Switch2FAProps {
  is2FAEnabled: boolean
  isLoading: boolean
}

export const Switch2FA = ({ is2FAEnabled, isLoading }: Switch2FAProps) => {
  const update2FA = ProfileMutations.useUpdate2FA()

  const handleUpdate2FA = (checked: boolean) => {
    update2FA.mutate({ enabled: checked })
  }

  if (isLoading) {
    return <Skeleton className="bg-input h-[1.15rem] max-w-37" />
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <Switch
        aria-label="Atualizar 2FA"
        checked={is2FAEnabled}
        onCheckedChange={() => handleUpdate2FA(!is2FAEnabled)}
      />
      <Label className="text-sm font-bold text-gray-900">Atualizar 2FA</Label>
    </div>
  )
}
