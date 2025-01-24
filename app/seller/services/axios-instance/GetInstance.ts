import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { Product } from '../../types/product';

interface ResponseData {
    user_data: Product[]
}

export const httpRequestGet = async(url: string,getType: AxiosInstance, userId?: string, productId?: string[]): Promise<ResponseData | void> => {
    try {
        const response: AxiosResponse<ResponseData> = await getType.get(url, {
            params: {
                userId: userId,
                productId: productId
            }
        });
        return response.data
    } 
    catch (error) {
        const axiosError = error as AxiosError
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            console.error('Server responded with an error:', axiosError.response.data);
            console.error('Status code:', axiosError.response.status);
        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error('No response received:', axiosError.request);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', axiosError.message);
        }
        throw axiosError;
    }
}