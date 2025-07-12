'use client'

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/hooks/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "@/components/InputError"

export default function Page() {
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/keterlambatan/mobile",
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      {/* Logo dan keterangan */}
      <div className="mb-6 flex flex-col items-center text-center space-y-2">
        <Image
          src="/logo-sekolah.png" // letakkan logo di /public/logo-sekolah.png
          alt="Logo Sekolah"
          width={64}
          height={64}
          priority
        />
        <h1 className="text-xl font-semibold">SD Islam Sahabat Ilmu</h1>
        <p className="text-sm text-muted-foreground">
          Login ke Aplikasi Pencatatan Keterlambatan
        </p>
      </div>

      {/* Form Login */}
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Masukkan email dan password Anda untuk melanjutkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <InputError messages={errors.email} />
              </div>

              <div className="grid gap-2">
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

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


// 'use client'

// import { useState } from 'react'
// import { useAuth } from '@/hooks/auth'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import InputError from '@/components/InputError'
// import { Button } from '@/components/ui/button'

// export default function LoginPage() {
//   const { login } = useAuth({
//     middleware: 'guest',
//     redirectIfAuthenticated: '/dashboard',
//   })

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     await login({
//       email,
//       password,
//       setErrors,
//     })
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <form onSubmit={handleSubmit} className="space-y-6">
       

//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             autoFocus
//           />
//           <InputError messages={errors.email} />
//         </div>

//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//           <InputError messages={errors.password} />
//         </div>

//         <div>
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }
