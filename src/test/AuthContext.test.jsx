import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe('AuthContext', () => {
  it('provides initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('provides login function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.login).toBe('function')
  })

  it('provides register function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.register).toBe('function')
  })

  it('provides logout function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.logout).toBe('function')
  })

  it('provides updateUser function', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(typeof result.current.updateUser).toBe('function')
  })
})

