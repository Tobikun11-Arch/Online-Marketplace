"use client"
import { useEffect, useState } from 'react';
import { auth, refresh } from   '../../SellerDashboard/axios/axios'

const checkAuth = () => {

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                const response = await auth.get('', { withCredentials: true })
                console.log(true)
                if (response.data.verToken === false) {
                    localStorage.clear()
                    console.log(false)
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
                            console.log(false)
                        }
                    }
                }
            }

        };

        verifyAccessToken();
    }, []);
};

export default checkAuth;