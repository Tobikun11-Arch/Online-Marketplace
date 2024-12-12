import React, { useState } from 'react'
import { useUser } from '../store/User'
import { UpdateProfile } from '../../Auth/StateHandlers/UpdateProfile'
import { UpdateProfiles } from '../axios/dataStore'

const ProfileTab = () => {
    const { user, setuser } = useUser()
    const Input = 'h-12 rounded-md outline-none p-2 dark:bg-[#333] bg-gray-200'
    const { setEmail, setFirstName, setLastName, setUsername, setPhoneNumber, setPetName, FirstName, LastName, Email, PhoneNumber, PetName, Username } = UpdateProfile()
    const [ update, setUpdate ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('') //message that if it was successful, not used.

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setUpdate(true)
        if(user){
            setuser({
                ...user,
                FirstName: FirstName || user.FirstName,
                LastName: LastName || user.LastName,
                PhoneNumber: PhoneNumber || user.PhoneNumber,
                PetName: PetName || user.PetName,
                Email: Email || user.Email,
                Username: Username || user.Username,
            });
        }

        const newProfile = {
            userId: user?._id,
            FirstName: FirstName || user?.FirstName,
            LastName: LastName || user?.LastName,
            PhoneNumber: PhoneNumber || user?.PhoneNumber,
            PetName: PetName || user?.PetName,
            Email: Email || user?.Email,
            Username: Username || user?.Username
        }

        try {
            const response = await UpdateProfiles.put('', newProfile, { withCredentials: true })
            const { message } = response.data
            setUpdate(false)
            setMessage(message)
        } catch (error) {
            console.error("Failed to update: ", error)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl'>Personal Information</h2>
                <h2>Dashboard/<span className='text-blue-800 font-bold font-abc'>Profile</span></h2>
            </div>

            <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-4'>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id='firstname' name='firstname' className={`${Input}`}
                        value={FirstName ? FirstName : user?.FirstName} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setFirstName(e.target.value)}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id='lastname' name='lastname' className={`${Input}`}
                        value={LastName ? LastName : user?.LastName} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setLastName(e.target.value)}/>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id='email' name='email' className={`${Input}`}
                        value={Email ? Email : user?.Email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' name='username' className={`${Input}`}
                        value={Username ? Username : user?.Username} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setUsername(e.target.value)}/>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input type="tel" id='phonenumber' name='phonenumber' className={`${Input}`}
                        value={PhoneNumber ? PhoneNumber : user?.PhoneNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="petname">Pet Name</label>
                        <input type="text" id='petname' name='petname' className={`${Input}`}
                        value={PetName ? PetName : user?.PetName} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPetName(e.target.value)}/>
                    </div>
                </div>

                <div className='flex self-end gap-2 mt-3'>
                    <button type='submit' className='py-2 px-4 bg-black dark:bg-white rounded-md text-white dark:text-black'>{update ? 'Updating...' : 'Update profile'}</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileTab
