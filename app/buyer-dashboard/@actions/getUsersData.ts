import { Products } from '../entities/entities'
import { userData, AllProducts } from '../axios/dataStore'
import { AxiosResponse } from 'axios'

export async function fetchProduct(): Promise<Products[]> {
    try {
        const response: AxiosResponse<{ product: Products[] }> = await userData.get('')
        return response.data.product
    } catch (error) {
        console.error("Fetch error: ", error)
        return []
    }
}

export async function fetchProducts(): Promise<Products[]> {
    try {
        const response: AxiosResponse<{ product: Products[] }> = await AllProducts.get('')
        return response.data.product
    } catch (error) {
        console.error("Fetch error: ", error)
        return []
    }
}