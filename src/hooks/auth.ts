'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import type { AxiosError } from 'axios'


interface UseAuthOptions {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
}

export const useAuth = ({ middleware = 'auth', redirectIfAuthenticated }: UseAuthOptions = {}) => {
  const router = useRouter()

  const {
    data: user,
    mutate,
  } = useSWR('/user', () =>
    axios
      .get('/user', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then(res => res.data)
      .catch(error => {
        if (middleware === 'auth') {
          router.push('/login')
        }
        throw error
      }),
  )

 const login = async ({
  email,
  password,
  setErrors,
}: {
  email: string
  password: string
  setErrors: (errors: Record<string, string[]>) => void
}) => {
  try {
    const response = await axios.post('/login', {
      email,
      password,
      device_name: 'browser',
    })

    Cookies.set('token', response.data.data.token)
    mutate()

    router.push('/dashboard')
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ errors: Record<string, string[]> }>

    if (axiosError.response?.status === 422) {
      setErrors(axiosError.response.data.errors)
      return
    }

    throw error
  }
}

  useEffect(() => {
    if (middleware === 'guest' && user && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated)
    }
  }, [user, middleware, redirectIfAuthenticated, router])

  const logout = async () => {
    try {
      Cookies.remove('token')
      mutate(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    login,
    logout,
  }
}
