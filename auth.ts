import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import AzureADProvider from "next-auth/providers/azure-ad"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, AzureADProvider],
})