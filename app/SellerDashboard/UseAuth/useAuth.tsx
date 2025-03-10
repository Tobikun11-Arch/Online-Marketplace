"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, refresh } from '../axios/axios';

const useAuth = () => {
    const router = useRouter()

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                const response = await auth.get('', { withCredentials: true })
                if (response.data.verToken === false) {
                    localStorage.clear()
                    router.push('/Auth');
                }
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    try {
                        await refresh.post('', {}, { withCredentials: true });
                        await auth.get('', { withCredentials: true });
                    } catch (refreshError: any) {
                        if (
                            refreshError.response &&
                            (refreshError.response.status === 401 || refreshError.response.status === 403)
                        ) {
                            localStorage.clear()
                            router.push('/Auth');
                        }
                    }
                }
            }
        };

        verifyAccessToken();
    }, [router]);
};

export default useAuth;