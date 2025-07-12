import { Card } from '@/components/ui/card'
import { ShieldCheck } from 'lucide-react'
import { Outlet } from 'react-router'
import { cn } from '../../lib/utils'

export default function AuthLayout() {
  const isSmallHeightScreen = window.innerHeight < 600

  return (
    <div
      className={cn(
        'flex h-screen w-screen items-center justify-center bg-slate-300',
        isSmallHeightScreen && '!h-full'
      )}
    >
      <div className="z-10 mr-[-24px] hidden sm:block lg:flex-1">
        <div
          className="bg-cover bg-center bg-no-repeat sm:h-64 sm:w-full sm:bg-[0_18rem] md:bg-[0_21rem] lg:h-screen lg:bg-[55%_0] xl:bg-center"
          style={{
            backgroundImage: 'url(/images/login-screen.png)'
          }}
        ></div>
      </div>
      <article
        className={cn(
          'z-20 ml-auto flex h-screen w-full flex-col items-center justify-between rounded-lg rounded-r-none bg-white px-0 py-12 shadow-md sm:max-w-full sm:px-16 lg:max-w-[600px]',
          isSmallHeightScreen && '!h-full'
        )}
      >
        <header className="flex w-full items-center justify-between px-6 sm:px-0">
          <h2 className="w-full bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text text-left text-3xl font-bold text-transparent">
            NaMesaJá
          </h2>
          <img
            src="/favicon.png"
            alt="NaMesaJá"
            className="h-10 w-10"
          />
        </header>

        <div className="flex w-full flex-col items-center justify-center">
          <Card className="w-full max-w-md gap-12 border-none shadow-none">
            <Outlet />
          </Card>
        </div>

        <div className="flex items-center gap-2 text-center text-sm text-gray-500">
          <ShieldCheck className="h-4 w-4" />
          Ambiente seguro
        </div>
      </article>
    </div>
  )
}
