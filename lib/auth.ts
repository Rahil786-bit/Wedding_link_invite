import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';

// Simple password hashing for demo (use bcrypt in production)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@wedding.local';
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        if (credentials.email !== adminEmail) {
          throw new Error('Invalid credentials');
        }

        if (adminPasswordHash && verifyPassword(credentials.password, adminPasswordHash)) {
          return {
            id: 'admin',
            email: adminEmail,
            name: 'Admin',
          };
        }

        throw new Error('Invalid credentials');
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}
