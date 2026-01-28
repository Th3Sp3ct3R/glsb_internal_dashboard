export interface Device {
  id: string
  device_name: string
  status: 'running' | 'stopped' | 'error'
  android_version?: string
  model?: string
  proxy?: string
  adb_enabled?: boolean
  accounts?: Account[]
}

export interface Account {
  id: string
  username: string
  display_name?: string
  profile_picture_url?: string
  bio?: string
  external_url?: string
  followers_count?: number
  following_count?: number
  posts_count?: number
  is_logged_in: boolean
  device_id?: string
  model?: string
  last_activity?: string
  is_flagged?: boolean
}

export interface DeviceStats {
  total: number
  running: number
  stopped: number
  error: number
}

export interface AccountStats {
  total: number
  logged_in: number
  not_logged_in: number
  flagged: number
}
