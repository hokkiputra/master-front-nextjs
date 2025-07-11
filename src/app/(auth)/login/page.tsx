'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/InputError'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await login({
      email,
      password,
      setErrors,
    })
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
       

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <InputError messages={errors.email} />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <InputError messages={errors.password} />
        </div>

        <div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}
