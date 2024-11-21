"use client"
import { useEffect, useState } from 'react';
import { auth, refresh } from   '../../SellerDashboard/axios/axios'

const CheckAuth = () => {

    useEffect(() => {
        const verifyAccessToken = async () => {
            try {
                const response = await auth.get('', { withCredentials: true })
                if (response.data.verToken === false) {
                    localStorage.clear()
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
                        }
                    }
                }
            }

        };

        verifyAccessToken();
    }, []);
};

export default CheckAuth;