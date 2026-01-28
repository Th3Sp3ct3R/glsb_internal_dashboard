import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Smartphone, Users, Activity } from 'lucide-react'
import { api } from '@/lib/api'
import { Device, Account } from '@/types'
import StatCard from '@/components/StatCard'
import Card from '@/components/Card'
import StatusBadge from '@/components/StatusBadge'

export default function Dashboard() {
  const { data: devices = [], isLoading: devicesLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: api.getDevices,
  })

  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: api.getAccounts,
  })

  const deviceStats = {
    total: devices.length,
    running: devices.filter((d) => d.status === 'running').length,
    stopped: devices.filter((d) => d.status === 'stopped').length,
    error: devices.filter((d) => d.status === 'error').length,
  }

  const accountStats = {
    total: accounts.length,
    logged_in: accounts.filter((a) => a.is_logged_in).length,
    not_logged_in: accounts.filter((a) => !a.is_logged_in).length,
  }

  if (devicesLoading || accountsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-semibold text-white mb-2"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
        >
          Operations Dashboard
        </h1>
        <p className="text-white/60">
          Instagram automation platform overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Devices"
          value={deviceStats.total}
          icon={<Smartphone size={32} />}
          description={`${deviceStats.running} running, ${deviceStats.stopped} stopped`}
        />
        <StatCard
          label="Running Devices"
          value={deviceStats.running}
          icon={<Activity size={32} className="text-green-500" />}
        />
        <StatCard
          label="Total Accounts"
          value={accountStats.total}
          icon={<Users size={32} />}
          description={`${accountStats.logged_in} logged in`}
        />
        <StatCard
          label="Active Accounts"
          value={accountStats.logged_in}
          icon={<Users size={32} className="text-green-500" />}
        />
      </div>

      {/* Device Fleet */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-semibold text-white"
            style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
          >
            Device Fleet
          </h2>
          <Link href="/devices">
            <a className="text-sm text-white/60 hover:text-white transition-colors">
              View All →
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices.slice(0, 8).map((device) => (
            <Link key={device.id} href={`/devices/${device.id}`}>
              <a>
                <Card hoverable>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          {device.device_name}
                        </h3>
                        <p className="text-white/40 text-xs font-mono">
                          {device.id}
                        </p>
                      </div>
                      <Smartphone size={20} className="text-white/20" />
                    </div>

                    <StatusBadge status={device.status} pulse />

                    {device.model && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-white/40 text-xs uppercase tracking-wide">
                          Model
                        </p>
                        <p className="text-white text-sm">{device.model}</p>
                      </div>
                    )}

                    {device.accounts && device.accounts.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                          Accounts ({device.accounts.length})
                        </p>
                        <div className="flex -space-x-2">
                          {device.accounts.slice(0, 3).map((account, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white/60"
                            >
                              {account.username?.[0]?.toUpperCase()}
                            </div>
                          ))}
                          {device.accounts.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white/60">
                              +{device.accounts.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
