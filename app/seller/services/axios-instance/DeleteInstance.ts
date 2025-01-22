import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';

interface DeleteData {
    [key: string]: any
}

interface ResponseData {
    [key: string]: any
}


export const httpDeleteReq = async(url: string, DeleteType: AxiosInstance, data: DeleteData): Promise<ResponseData | void> => {
    try {
        const response: AxiosResponse<ResponseData> = await DeleteType.delete(url, {
            data: data
        });
        return response.data.message
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