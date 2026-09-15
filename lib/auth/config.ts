import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const mockCredentials: Record<string, { password: string; role: string }> = {
  "admin@bazaarly.com": { password: "admin123", role: "admin" },
  "seller1@bazaarly.com": { password: "seller123", role: "seller" },
  "seller2@bazaarly.com": { password: "seller123", role: "seller" },
  "customer@bazaarly.com": { password: "customer123", role: "customer" },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string) || "";
        const password = (credentials?.password as string) || "";
        const entry = Object.entries(mockCredentials).find(([e]) => e === email);
        if (!entry || entry[1].password !== password) return null;
        return {
          id: email,
          name: email.split("@")[0],
          email,
          role: entry[1].role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).role) {
        (token as any).role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub ?? session.user.email) as string;
        // @ts-ignore - role is added via jwt callback
        session.user.role = (token as any).role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET ?? "bazaarly-dev-secret",
});

export const GET = handlers.GET;
export const POST = handlers.POST;
