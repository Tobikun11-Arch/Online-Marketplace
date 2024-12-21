"use client"
import React, { useEffect } from 'react'
import Dashboard from './buyer-dashboard/page'
import { useUser } from './buyer-dashboard/store/User'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { user } = useUser()
    const router = useRouter()

    useEffect(()=> {
        if(user?.Role === 'seller') {
          router.push('/SellerDashboard/Home')
        }
    }, [user])

  return <Dashboard />
}

export default Page