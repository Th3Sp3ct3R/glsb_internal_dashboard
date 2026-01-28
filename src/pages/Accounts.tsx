import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Users, ArrowUpDown } from 'lucide-react'
import { api } from '@/lib/api'
import { Account } from '@/types'
import { formatNumber } from '@/lib/utils'
import Card from '@/components/Card'
import StatusBadge from '@/components/StatusBadge'

type SortKey = 'username' | 'followers_count' | 'posts_count'
type SortOrder = 'asc' | 'desc'

export default function Accounts() {
  const [filter, setFilter] = useState<'all' | 'logged_in' | 'not_logged_in'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('username')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: api.getAccounts,
  })

  const filteredAndSorted = useMemo(() => {
    let filtered = accounts.filter((account) => {
      if (filter === 'all') return true
      if (filter === 'logged_in') return account.is_logged_in
      if (filter === 'not_logged_in') return !account.is_logged_in
      return true
    })

    return filtered.sort((a, b) => {
      const aVal = a[sortKey] || 0
      const bVal = b[sortKey] || 0

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      return sortOrder === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal)
    })
  }, [accounts, filter, sortKey, sortOrder])

  const stats = {
    total: accounts.length,
    logged_in: accounts.filter((a) => a.is_logged_in).length,
    not_logged_in: accounts.filter((a) => !a.is_logged_in).length,
    flagged: accounts.filter((a) => a.is_flagged).length,
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-white/60">Loading accounts...</div>
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
          Instagram Accounts
        </h1>
        <p className="text-white/60">
          {stats.total} accounts • {stats.logged_in} logged in •{' '}
          {stats.flagged} flagged
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'logged_in', 'not_logged_in'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm border transition-all ${
              filter === f
                ? 'bg-white text-black border-white'
                : 'bg-black text-white/60 border-white/20 hover:border-white/40'
            }`}
          >
            {f === 'all'
              ? 'All'
              : f === 'logged_in'
              ? 'Logged In'
              : 'Not Logged In'}
            <span className="ml-2 text-xs">
              ({f === 'all'
                ? stats.total
                : f === 'logged_in'
                ? stats.logged_in
                : stats.not_logged_in})
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left px-6 py-4 text-white/60 text-xs uppercase tracking-wide font-medium">
                  Account
                </th>
                <th className="text-left px-6 py-4 text-white/60 text-xs uppercase tracking-wide font-medium">
                  <button
                    onClick={() => toggleSort('username')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Username
                    {sortKey === 'username' && (
                      <ArrowUpDown size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                    )}
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-white/60 text-xs uppercase tracking-wide font-medium">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-white/60 text-xs uppercase tracking-wide font-medium">
                  Model
                </th>
                <th className="text-right px-6 py-4 text-white/60 text-xs uppercase tracking-wide font-medium">
                  <button
                    onClick={() => toggleSort('followers_count')}
                    className="flex items-center gap-2 ml-auto hover:text-white transition-colors"
                  >
                    Followers
                    {sortKey === 'followers_count' && (
                      <ArrowUpDown size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                    )}
                  </button>
                </th>
                <th className="text-right px-6 py-4 text-white/60 text-xs uppercase tracking-wide font-medium">
                  <button
                    onClick={() => toggleSort('posts_count')}
                    className="flex items-center gap-2 ml-auto hover:text-white transition-colors"
                  >
                    Posts
                    {sortKey === 'posts_count' && (
                      <ArrowUpDown size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link href={`/accounts/${account.id}`}>
                      <a className="flex items-center gap-3">
                        {account.profile_picture_url ? (
                          <img
                            src={account.profile_picture_url}
                            alt={account.username}
                            className="w-10 h-10 rounded-full border border-white/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60">
                            {account.username[0]?.toUpperCase()}
                          </div>
                        )}
                      </a>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/accounts/${account.id}`}>
                      <a className="hover:text-white/80">
                        <div>
                          <p className="text-white font-medium">
                            {account.display_name || account.username}
                          </p>
                          <p className="text-white/60 text-sm">@{account.username}</p>
                        </div>
                      </a>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={account.is_logged_in ? 'running' : 'stopped'}
                      label={account.is_logged_in ? 'Active' : 'Inactive'}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white/80 text-sm">
                      {account.model || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-mono">
                      {formatNumber(account.followers_count)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-mono">
                      {formatNumber(account.posts_count)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="text-center py-16">
            <Users size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/60">No accounts found with the selected filter</p>
          </div>
        )}
      </Card>
    </div>
  )
}
