import { NextResponse } from "next/server";
import { signIn } from '../auth'

export async function GET() {
    await signIn("google")
    return NextResponse.json({ message: "Successful login" })
}