'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res.ok) {
      const s = await (await fetch('/api/auth/session')).json()
      if (s?.user?.role === 'admin') router.push('/admin-dashboard')
      else router.push('/dashboard')
    } else setError('Invalid email or password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto h-20 w-auto mb-2" />
          <p className="mt-1 text-sm text-gray-600">Please sign in to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border" />
          <button type="submit" className="w-full py-2 bg-[#932421] text-white">Login</button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-sm text-center">
          Don&apos;t have an account? <a href="/signup" className="text-red-700 underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}
