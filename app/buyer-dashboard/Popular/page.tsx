import { AllProducts } from "../axios/dataStore";
import Popular from "./Popular";

export default async function Page() {
    try {
        const response = await AllProducts.get('')
        const { popular_products } = response.data
        return <Popular popular_products={popular_products}/>
    } catch (error) {
        console.error(error)
    }
}
