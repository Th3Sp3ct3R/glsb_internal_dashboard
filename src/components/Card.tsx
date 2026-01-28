import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

export default function Card({ children, className, hoverable = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-black border border-white/10 p-6 transition-all',
        hoverable && 'hover:shadow-glow-white cursor-pointer hover:border-white/20',
        className
      )}
    >
      {children}
    </div>
  )
}
