"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { users, refresh } from '../axios/axios';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                const response = await users.get('', { withCredentials: true });
                console.log("VerToken: ", response.data.verToken);
                if (response.data.verToken === false) {
                    router.push('/');
                }
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    try {
                        await refresh.post('', {}, { withCredentials: true });
                        const newResponse = await users.get('', { withCredentials: true });
                        console.log('New VerToken:', newResponse.data.verToken);
                    } catch (refreshError: any) {
                        if (
                            refreshError.response &&
                            (refreshError.response.status === 401 || refreshError.response.status === 403)
                        ) {
                            console.log("Refresh token expired. Logging out...");
                            router.push('/');
                        }
                    }
                }
            }
        };

        verifyAccessToken();
    }, [router]);
};

export default useAuth;