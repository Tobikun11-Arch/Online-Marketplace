import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';

export const addInterceptors = (instance: AxiosInstance): void => {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            console.log('Request Interceptor:', config);
            return config;
        },
        (error: AxiosError) => {
            console.error('Request Error Interceptor:', error);
            return Promise.reject(error);   
        }
    );

    // Response interceptor
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            // Handle successful responses
            console.log('Response Interceptor:', response);
            return response;
        },
        (error: AxiosError) => {
            // Handle errors globally
            if (error.response) {
                const { status } = error.response;
                switch (status) {
                    case 401:
                    console.error('Unauthorized access. Redirecting to login...');
                    break;
                    case 500:
                    console.error('Server error. Please try again later.');
                    break;
                    default:
                    console.error('An error occurred:', error.message);
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Request setup error:', error.message);
            }
            return Promise.reject(error);
        }
    );
};