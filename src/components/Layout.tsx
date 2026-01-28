import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
