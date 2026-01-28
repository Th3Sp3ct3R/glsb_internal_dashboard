import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Smartphone, Play, Square, RefreshCw } from 'lucide-react'
import { api } from '@/lib/api'
import Card from '@/components/Card'
import StatusBadge from '@/components/StatusBadge'
import Button from '@/components/Button'

export default function Devices() {
  const [filter, setFilter] = useState<'all' | 'running' | 'stopped'>('all')
  const queryClient = useQueryClient()

  const { data: devices = [], isLoading } = useQuery({
    queryKey: ['devices'],
    queryFn: api.getDevices,
  })

  const syncMutation = useMutation({
    mutationFn: api.syncDevices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })

  const filteredDevices = devices.filter((device) => {
    if (filter === 'all') return true
    return device.status === filter
  })

  const stats = {
    total: devices.length,
    running: devices.filter((d) => d.status === 'running').length,
    stopped: devices.filter((d) => d.status === 'stopped').length,
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white/60">Loading devices...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-semibold text-white mb-2"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
          >
            Device Fleet
          </h1>
          <p className="text-white/60">
            {stats.total} devices • {stats.running} running • {stats.stopped} stopped
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
          >
            <RefreshCw size={16} className={syncMutation.isPending ? 'animate-spin' : ''} />
            <span className="ml-2">Sync All</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'running', 'stopped'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm border transition-all ${
              filter === f
                ? 'bg-white text-black border-white'
                : 'bg-black text-white/60 border-white/20 hover:border-white/40'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && (
              <span className="ml-2 text-xs">
                ({f === 'running' ? stats.running : stats.stopped})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDevices.map((device) => (
          <Link key={device.id} href={`/devices/${device.id}`}>
            <a>
              <Card hoverable>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1 truncate">
                        {device.device_name}
                      </h3>
                      <p className="text-white/40 text-xs font-mono">
                        {device.id}
                      </p>
                    </div>
                    <Smartphone size={20} className="text-white/20 flex-shrink-0 ml-2" />
                  </div>

                  {/* Status */}
                  <StatusBadge status={device.status} pulse />

                  {/* Details */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    {device.model && (
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wide">
                          Model
                        </p>
                        <p className="text-white text-sm">{device.model}</p>
                      </div>
                    )}

                    {device.android_version && (
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wide">
                          Android
                        </p>
                        <p className="text-white text-sm">{device.android_version}</p>
                      </div>
                    )}

                    {device.accounts && device.accounts.length > 0 && (
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                          Accounts ({device.accounts.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {device.accounts.slice(0, 5).map((account, idx) => (
                            <div
                              key={idx}
                              className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-white/80"
                            >
                              @{account.username}
                            </div>
                          ))}
                          {device.accounts.length > 5 && (
                            <div className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-white/60">
                              +{device.accounts.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </a>
          </Link>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-16">
          <Smartphone size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/60">No devices found with the selected filter</p>
        </div>
      )}
    </div>
  )
}
