"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, refresh } from '../axios/axios';
import { useAuthIdentifier } from '../../buyer-dashboard/store/Auth'

const useAuth = () => {
    const router = useRouter()
    const { setAuth } = useAuthIdentifier()
    const [ isLoading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                const response = await auth.get('', { withCredentials: true });
                setAuth(true)
                if (response.data.verToken === false) {
                    localStorage.clear()
                    setAuth(false)
                    router.push('/');
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
                            router.push('/');
                            setAuth(false)
                        }
                    }
                }
            }

            finally {
                setLoading(false)
            }
        };

        verifyAccessToken();
    }, [router]);

    return isLoading
};

export default useAuth;