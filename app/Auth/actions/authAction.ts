"use server"
import { signIn, auth, signOut } from "../../auth"

export async function SignUpGoogle() {
    await signIn("google")
}

export async function SignUpGithub() {
    await signIn("github")
}

export async function RegisterAuth() { 
    const session = await auth()
    return session?.user
}

export async function LoginAuth() {
    const session = await auth()
    return session?.user
} 

export async function SignOut() {
    const session = await signOut()
    return session
}