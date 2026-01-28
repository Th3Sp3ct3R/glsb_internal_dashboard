import { Link, useLocation } from 'wouter'
import { Activity, Smartphone, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [location] = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Activity },
    { path: '/devices', label: 'Devices', icon: Smartphone },
    { path: '/accounts', label: 'Accounts', icon: Users },
  ]

  return (
    <nav className="border-b border-white/10 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <div className="w-4 h-4 bg-black"></div>
              </div>
              <span 
                className="text-xl font-semibold tracking-tight text-white"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              >
                VANTA LABS
              </span>
            </a>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location === item.path || 
                (item.path !== '/' && location.startsWith(item.path))
              
              return (
                <Link key={item.path} href={item.path}>
                  <a
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-white border-b-2 border-white'
                        : 'text-white/60 hover:text-white'
                    )}
                  >
                    <Icon size={16} />
                    {item.label}
                  </a>
                </Link>
              )
            })}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-glow-green pulse-glow"></div>
            <span className="text-xs text-white/60 font-mono">LIVE</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
