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

    const profile = 'p-2'

    return (
        <div className='cursor-default flex flex-col gap-3 text-xl w-full'>
            <h2 className={`${profile}`}>Profile</h2>
            <h2 className={`${profile}`}>Orders</h2>
            <h2 className={`${profile}`}>Wishlist</h2>
            <h2 className={`${profile}`}>Account settings</h2>
            <h2 className={`${profile}`} onClick={handleSignOut}>Sign Out</h2>
        </div>
    )
}

export default UserProfile
