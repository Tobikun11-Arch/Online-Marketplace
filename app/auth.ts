import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Github],
    session: {
        strategy: "jwt", 
        maxAge: 100, //session expire after 10secs
    }
})