import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';

interface ProviderObject {
    clientId: string;
    clientSecret: string;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET || '',
      }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials}: any){
        if(user.email === 'andrew.gary91@gmail.com'){
            return true;
        }

        return false;

    }
  },
}
export default NextAuth(authOptions)