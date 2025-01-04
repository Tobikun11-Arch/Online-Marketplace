"use server"
import { signIn } from "../../auth"

export async function SignUpGoogle() {
    await signIn("google")
}

export async function SignUpGithub() {
    await signIn("github")
}