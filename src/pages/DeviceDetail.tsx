import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useRoute } from 'wouter'
import { ArrowLeft, Play, Square, RefreshCw, Smartphone, Users } from 'lucide-react'
import { api } from '@/lib/api'
import { formatNumber } from '@/lib/utils'
import Card from '@/components/Card'
import StatusBadge from '@/components/StatusBadge'
import Button from '@/components/Button'

export default function DeviceDetail() {
  const [, params] = useRoute('/devices/:id')
  const deviceId = params?.id || ''
  const queryClient = useQueryClient()

  const { data: device, isLoading } = useQuery({
    queryKey: ['device', deviceId],
    queryFn: () => api.getDevice(deviceId),
    enabled: !!deviceId,
  })

  const startMutation = useMutation({
    mutationFn: () => api.startDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device', deviceId] })
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })

  const stopMutation = useMutation({
    mutationFn: () => api.stopDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device', deviceId] })
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white/60">Loading device...</div>
      </div>
    )
  }

  if (!device) {
    return (
      <div className="text-center py-16">
        <p className="text-white/60">Device not found</p>
        <Link href="/devices">
          <a className="text-white hover:underline mt-4 inline-block">← Back to Devices</a>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/devices">
        <a className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          Back to Devices
        </a>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl font-semibold text-white mb-2"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
          >
            {device.device_name}
          </h1>
          <p className="text-white/60 font-mono text-sm">{device.id}</p>
        </div>

        <div className="flex gap-3">
          {device.status === 'stopped' ? (
            <Button
              onClick={() => startMutation.mutate()}
              disabled={startMutation.isPending}
            >
              <Play size={16} />
              <span className="ml-2">Start Device</span>
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => stopMutation.mutate()}
              disabled={stopMutation.isPending}
            >
              <Square size={16} />
              <span className="ml-2">Stop Device</span>
            </Button>
          )}
        </div>
      </div>

      {/* Device Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone size={24} className="text-white/60" />
            <h2 className="text-xl font-semibold text-white">Device Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Status</p>
              <StatusBadge status={device.status} pulse />
            </div>

            {device.model && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Model</p>
                <p className="text-white">{device.model}</p>
              </div>
            )}

            {device.android_version && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  Android Version
                </p>
                <p className="text-white">{device.android_version}</p>
              </div>
            )}

            {device.proxy && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Proxy</p>
                <p className="text-white font-mono text-sm">{device.proxy}</p>
              </div>
            )}

            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">ADB</p>
              <p className="text-white">
                {device.adb_enabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>

            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                Attached Accounts
              </p>
              <p className="text-white text-2xl font-semibold">
                {device.accounts?.length || 0}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                Active Accounts
              </p>
              <p className="text-white text-2xl font-semibold">
                {device.accounts?.filter((a) => a.is_logged_in).length || 0}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                Total Followers
              </p>
              <p className="text-white text-2xl font-semibold">
                {formatNumber(
                  device.accounts?.reduce((sum, a) => sum + (a.followers_count || 0), 0)
                )}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Accounts */}
      {device.accounts && device.accounts.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Users size={24} className="text-white/60" />
            <h2 className="text-xl font-semibold text-white">
              Attached Accounts ({device.accounts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {device.accounts.map((account) => (
              <Link key={account.id} href={`/accounts/${account.id}`}>
                <a>
                  <Card hoverable>
                    <div className="space-y-3">
                      {/* Profile */}
                      <div className="flex items-center gap-3">
                        {account.profile_picture_url ? (
                          <img
                            src={account.profile_picture_url}
                            alt={account.username}
                            className="w-12 h-12 rounded-full border border-white/20"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60">
                            {account.username[0]?.toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {account.display_name || account.username}
                          </p>
                          <p className="text-white/60 text-sm truncate">
                            @{account.username}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <StatusBadge
                        status={account.is_logged_in ? 'running' : 'stopped'}
                        label={account.is_logged_in ? 'Logged In' : 'Not Logged In'}
                      />

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                        <div>
                          <p className="text-white/40 text-xs">Posts</p>
                          <p className="text-white text-sm font-medium">
                            {formatNumber(account.posts_count)}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Followers</p>
                          <p className="text-white text-sm font-medium">
                            {formatNumber(account.followers_count)}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Following</p>
                          <p className="text-white text-sm font-medium">
                            {formatNumber(account.following_count)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
