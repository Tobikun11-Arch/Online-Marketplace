'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth_token, refresh_token } from './services/axios/UserAuthentication';
import LogoLoading from './loading/LogoLoading'
import SellerDashboardLayout from './SellerDashboard';

export default function DashboardPage() {
    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isValid, setIsValid ] = useState<boolean>(false)

    useEffect(() => {
        const validateToken = async () => {
            setIsLoading(true)
            try {
                const response = await auth_token.get('', { withCredentials: true });
                console.log("response: ", response.data.verToken)
                if (response.data.verToken === false) {
                    localStorage.clear();
                    router.push('/Auth');
                    return;
                } else {
                    setIsValid(true)
                }

                // Token is valid, proceed to dashboard
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    try {
                        // Attempt to refresh the token
                        await refresh_token.post('', {}, { withCredentials: true });
                        const newResponse = await auth_token.get('', { withCredentials: true });

                        if (newResponse.data.verToken === false) {
                            // Refresh token failed, clear localStorage and redirect
                            localStorage.clear();
                            router.push('/Auth');
                        } else {
                            setIsLoading(false);
                            setIsValid(true)
                        }
                    } catch (refreshError: any) {
                        if (
                            refreshError.response &&
                            (refreshError.response.status === 401 || refreshError.response.status === 403)
                        ) {
                            // Refresh token failed, clear localStorage and redirect
                            localStorage.clear();
                            router.push('/Auth');
                        }
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        validateToken();
    }, [router]);

    if(isLoading) {
        return <LogoLoading/>
    }

    return (
        <>
            {isValid ? (
                <SellerDashboardLayout/>
            ) : (
                <LogoLoading/>
            ) }
        </>
    )

}