import { useQuery } from '@tanstack/react-query'
import { Link, useRoute } from 'wouter'
import { ArrowLeft, Users, ExternalLink, Smartphone } from 'lucide-react'
import { api } from '@/lib/api'
import { formatNumber } from '@/lib/utils'
import Card from '@/components/Card'
import StatusBadge from '@/components/StatusBadge'

export default function AccountDetail() {
  const [, params] = useRoute('/accounts/:id')
  const accountId = params?.id || ''

  const { data: account, isLoading } = useQuery({
    queryKey: ['account', accountId],
    queryFn: () => api.getAccount(accountId),
    enabled: !!accountId,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white/60">Loading account...</div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="text-center py-16">
        <p className="text-white/60">Account not found</p>
        <Link href="/accounts">
          <a className="text-white hover:underline mt-4 inline-block">← Back to Accounts</a>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/accounts">
        <a className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          Back to Accounts
        </a>
      </Link>

      {/* Header with Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            {account.profile_picture_url ? (
              <img
                src={account.profile_picture_url}
                alt={account.username}
                className="w-32 h-32 rounded-full border-2 border-white/20"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white/60 text-4xl font-semibold">
                {account.username[0]?.toUpperCase()}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <h1
                className="text-3xl font-semibold text-white mb-2"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
              >
                {account.display_name || account.username}
              </h1>
              <p className="text-white/60 text-lg mb-4">@{account.username}</p>

              <div className="mb-4">
                <StatusBadge
                  status={account.is_logged_in ? 'running' : 'stopped'}
                  label={account.is_logged_in ? 'Logged In' : 'Not Logged In'}
                  pulse
                />
              </div>

              {account.bio && (
                <p className="text-white/80 mb-4 leading-relaxed">{account.bio}</p>
              )}

              {account.external_url && (
                <a
                  href={account.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  {account.external_url}
                </a>
              )}
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-6">Statistics</h3>
          <div className="space-y-6">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Posts</p>
              <p
                className="text-3xl font-semibold text-white"
                style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              >
                {formatNumber(account.posts_count)}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Followers</p>
              <p
                className="text-3xl font-semibold text-white"
                style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              >
                {formatNumber(account.followers_count)}
              </p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">Following</p>
              <p
                className="text-3xl font-semibold text-white"
                style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              >
                {formatNumber(account.following_count)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-6">Account Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Account ID</p>
              <p className="text-white font-mono text-sm">{account.id}</p>
            </div>

            {account.model && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Model</p>
                <p className="text-white">{account.model}</p>
              </div>
            )}

            {account.device_id && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  Assigned Device
                </p>
                <Link href={`/devices/${account.device_id}`}>
                  <a className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                    <Smartphone size={16} />
                    {account.device_id}
                  </a>
                </Link>
              </div>
            )}

            {account.last_activity && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  Last Activity
                </p>
                <p className="text-white">
                  {new Date(account.last_activity).toLocaleString()}
                </p>
              </div>
            )}

            {account.is_flagged && (
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Status</p>
                <StatusBadge status="flagged" label="Flagged" />
              </div>
            )}
          </div>
        </Card>

        {/* Activity History Placeholder */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/60 text-sm">Activity history coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
