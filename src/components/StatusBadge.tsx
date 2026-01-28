import { cn, getStatusColor } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  label?: string
  pulse?: boolean
}

export default function StatusBadge({ status, label, pulse = false }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'w-2 h-2 rounded-full',
          getStatusColor(status),
          pulse && status === 'running' && 'pulse-glow'
        )}
      />
      <span className="text-white/60 text-sm uppercase tracking-wide font-medium">
        {label || status}
      </span>
    </div>
  )
}
