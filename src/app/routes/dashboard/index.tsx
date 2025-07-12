import { type MetaFunction } from 'react-router'

export const meta: MetaFunction = () => [{ title: 'Dashboard - NaMesaJá' }]

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
      </div>
    </div>
  )
}
