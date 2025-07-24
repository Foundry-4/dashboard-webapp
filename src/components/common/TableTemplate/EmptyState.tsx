import { AlertCircle } from 'lucide-react'

export const EmptyState = () => {
  return (
    <div className="border-[oklch(0.922 0 0)] flex h-[579px] w-full items-center justify-center rounded-sm">
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-orange-300" />
        <div className="text-lg font-semibold text-gray-700">
          Nenhum resultado encontrado
        </div>
        <div className="text-sm text-gray-500">
          Tente ajustar seus filtros ou termos de busca para encontrar o que
          procura.
        </div>
      </div>
    </div>
  )
}
