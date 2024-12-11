import React, { useEffect } from 'react'
import { useUser } from '../store/User'

const ProfileTab = () => {
    const { user } = useUser()
    const Input = 'h-12 rounded-md outline-none p-2 dark:bg-[#333] bg-gray-200'

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl'>Personal Information</h2>
                <h2>Dashboard/<span className='text-blue-800 font-bold font-abc'>Profile</span></h2>
            </div>

            <form action="" className='mt-5 flex flex-col gap-4'>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id='firstname' name='firstname' className={`${Input}`}
                        value={user?.FirstName}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id='lastname' name='lastname' className={`${Input}`}
                        value={user?.LastName}/>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id='email' name='email' className={`${Input}`}
                        value={user?.Email}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' className={`${Input}`}
                        value={user?.Username}/>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input type="tel" id='phonenumber' name='phonenumber' className={`${Input}`}
                        value={user?.PhoneNumber}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="petname">Pet Name</label>
                        <input type="text" id='petname' name='petname' className={`${Input}`}/>
                    </div>
                </div>

                <div className='flex self-end gap-2 mt-3'>
                    <button className='py-2 px-4 bg-black dark:bg-white rounded-md text-white dark:text-black'>Update profile</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileTab
