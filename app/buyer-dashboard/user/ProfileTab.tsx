import React from 'react'

const ProfileTab = () => {
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
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" id='fullname' name='fullname' className={`${Input}`}/>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input type="tel" id='phonenumber' name='phonenumber' className={`${Input}`}/>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id='email' name='email' className={`${Input}`}/>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' className={`${Input}`}/>
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
