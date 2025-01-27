import NextAuth, { DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import { verifyPassword } from '@/lib/auth'

// Extend the built-in types
declare module "next-auth" {
  interface User extends DefaultUser {
    userId: string
    role: "USER" | "ADMIN"
  }
  
  interface Session {
    user: User & {
      id: string
      userId: string 
      role: "USER" | "ADMIN"
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true
          }
        })

        if (!user) {
          throw new Error('Invalid email or password')
        }

        const isValid = await verifyPassword(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Invalid email or password')
        }

        // Return consistent user object with both id and userId
        return {
          id: user.id,
          userId: user.id, // Ensure userId is set
          email: user.email,
          name: user.name || undefined,
          role: user.role as "USER" | "ADMIN"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure both id and userId are set in token
        token.id = user.id
        token.userId = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Set both id and userId in session
        session.user.id = token.id
        session.user.userId = token.id
        session.user.role = token.role as "USER" | "ADMIN"
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
})

export { handler as GET, handler as POST }