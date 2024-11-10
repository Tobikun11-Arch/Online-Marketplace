"use server"
import { Products } from '../entities/entities'

export async function fetchUserData(): Promise<Products[]> {
    try {
        
    } catch (error) {
        console.error("Fetch error: ", error)
        return []
    }
}