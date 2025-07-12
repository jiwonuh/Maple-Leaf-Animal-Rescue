import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import { compare } from 'bcryptjs'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize({ email, password }) {
        const client = await clientPromise
        const user = await client.db().collection('users').findOne({ email })
        if (!user) return null
        const valid = await compare(password, user.password)
        if (!valid) return null
        return { id: user._id.toString(), email: user.email, role: user.role }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})
