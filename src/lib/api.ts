import { Device, Account } from '@/types'

const API_BASE = '/api'

export const api = {
  // Devices
  async getDevices(): Promise<Device[]> {
    const response = await fetch(`${API_BASE}/devices`)
    if (!response.ok) throw new Error('Failed to fetch devices')
    return response.json()
  },

  async getDevice(id: string): Promise<Device> {
    const response = await fetch(`${API_BASE}/devices/${id}`)
    if (!response.ok) throw new Error('Failed to fetch device')
    return response.json()
  },

  async startDevice(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/devices/${id}/start`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to start device')
  },

  async stopDevice(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/devices/${id}/stop`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to stop device')
  },

  async syncDevices(): Promise<void> {
    const response = await fetch(`${API_BASE}/geelark/sync-devices`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to sync devices')
  },

  // Accounts
  async getAccounts(): Promise<Account[]> {
    const response = await fetch(`${API_BASE}/accounts`)
    if (!response.ok) throw new Error('Failed to fetch accounts')
    return response.json()
  },

  async getAccount(id: string): Promise<Account> {
    const response = await fetch(`${API_BASE}/accounts/${id}`)
    if (!response.ok) throw new Error('Failed to fetch account')
    return response.json()
  },
}
