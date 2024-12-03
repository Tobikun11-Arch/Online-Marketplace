import React from 'react'
import { Signout } from '../../../SellerDashboard/axios/axios'
import { useRouter } from 'next/navigation'

const UserProfile = () => {
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const response = await Signout.post('', {}, { withCredentials: true });
            const { message } = response.data;
            if(message === 'Signed out successfully!'){ 
                router.push('/buyer-dashboard/SigningOut')
            }
        } catch (error) {
            console.error("Error during signout:", error);
        }
    }

    return (
        <div className='cursor-default flex flex-col gap-3 text-xl'>
            <h2 className='hover:underline'>Profile</h2>
            <h2 className='hover:underline'>Orders</h2>
            <h2 className='hover:underline'>Wishlist</h2>
            <h2 className='hover:underline'>Account <br /> Settings</h2>
            <h2 className='hover:underline' onClick={handleSignOut}>Sign Out</h2>
        </div>
    )
}

export default UserProfile
