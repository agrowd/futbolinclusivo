import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTH] Intentando login para:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Faltan credenciales");
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          await dbConnect();
          const safeEmail = credentials.email.trim().toLowerCase();
          console.log("[AUTH] DB conectada, buscando:", safeEmail);

          const user = await User.findOne({ email: safeEmail }).select("+password");
          console.log("[AUTH] Usuario encontrado:", user ? "SI" : "NO");

          if (!user) {
            throw new Error("Credenciales inválidas");
          }

          if (!user.active) {
            console.log("[AUTH] Usuario inactivo");
            throw new Error("Usuario inactivo");
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log("[AUTH] Contraseña válida:", isPasswordValid);

          if (!isPasswordValid) {
            throw new Error("Credenciales inválidas");
          }

          await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
          console.log("[AUTH] Login exitoso");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("[AUTH] Error en try-catch de authorize:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
