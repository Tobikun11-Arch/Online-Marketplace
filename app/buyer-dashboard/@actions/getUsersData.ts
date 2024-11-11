import { Products } from '../entities/entities'
import { userData, AllProducts } from '../axios/dataStore'
import { AxiosResponse } from 'axios'

export async function fetchUserData(): Promise<Products[]> {
    try {
        const response: AxiosResponse<{ product: Products[] }> = await userData.get('')
        return response.data.product
    } catch (error) {
        console.error("Fetch error: ", error)
        return []
    }
}