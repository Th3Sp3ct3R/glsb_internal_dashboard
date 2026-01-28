import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium transition-all border',
        // Variants
        variant === 'primary' &&
          'bg-white text-black border-white hover:shadow-glow-white disabled:opacity-50',
        variant === 'secondary' &&
          'bg-black text-white border-white/20 hover:border-white/40 hover:shadow-glow-white disabled:opacity-50',
        variant === 'danger' &&
          'bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500/20 hover:shadow-glow-red disabled:opacity-50',
        variant === 'ghost' &&
          'bg-transparent text-white/60 border-transparent hover:text-white hover:bg-white/5 disabled:opacity-50',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        disabled && 'cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
