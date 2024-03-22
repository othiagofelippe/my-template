import api from "@/utils/axios-config";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        try {
          const { data: users } = await api.get(
            `/users?email=${credentials.email}`,
          );

          const user = users[0];

          if (user && user.password === credentials.password) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }

          return null;
        } catch (error) {
          console.error("Erro na busca do usuário:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
