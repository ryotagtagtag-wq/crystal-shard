import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"
// Firebase プロバイダーは実際にはカスタム実装または次を使用:
// import FirebaseProvider from "next-auth/providers/firebase"
// ここでは概念を示すためにプレースホルダーを使用

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // 実際の実装では以下のようにFirebaseプロバイダーを設定:
    // FirebaseProvider({
    //   clientId: process.env.FIREBASE_CLIENT_ID!,
    //   clientSecret: process.env.FIREBASE_CLIENT_SECRET!,
    //   // その他必要なFirebase設定
    // }),
    // プレイスロース（実際の実装時に置き換えてください）
    {
      id: "firebase",
      name: "Firebase",
      type: "oauth",
      wellKnown: "https://firebaseio.com/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.uid,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
