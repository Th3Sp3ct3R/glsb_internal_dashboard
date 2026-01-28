import { ReactNode } from 'react'
import Card from './Card'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  description?: string
}

export default function StatCard({ label, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm uppercase tracking-wide mb-2">{label}</p>
          <p
            className="text-4xl font-semibold text-white"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
          >
            {value}
          </p>
          {description && (
            <p className="text-white/40 text-xs mt-2">{description}</p>
          )}
        </div>
        {icon && <div className="text-white/20">{icon}</div>}
      </div>
    </Card>
  )
}
