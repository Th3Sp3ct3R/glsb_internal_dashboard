import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNumber(num: number | undefined): string {
  if (num === undefined) return '0'
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'running':
    case 'active':
      return 'bg-green-500 shadow-glow-green'
    case 'stopped':
    case 'inactive':
      return 'bg-gray-600'
    case 'error':
    case 'flagged':
      return 'bg-red-500 shadow-glow-red'
    case 'warning':
      return 'bg-yellow-500 shadow-glow-gold'
    default:
      return 'bg-gray-600'
  }
}
