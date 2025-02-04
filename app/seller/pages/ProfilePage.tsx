import React, { useEffect, useState } from 'react'
import { useUser } from '../state/User'
import Input from '../components/Input'
import { UpdateProfile } from '../../Auth/StateHandlers/UpdateProfile'
import { httpRequestPut } from '../services/axios-instance/PutInstance'
import { update_seller } from '../services/axios/UserRequest'
import { useToast } from '../../../@/hooks/use-toast'

//Edit profile
export default function ProfilePage() {
    const { user, setUser } = useUser()
    const { setEmail, setFirstName, setLastName, setUsername, setPhoneNumber, setPetName, FirstName, LastName, Email, PhoneNumber, PetName, Username } = UpdateProfile()
    const [ update, setUpdate ] = useState<boolean>(false)
    const { toast } = useToast()
    
    function reset() {
        setFirstName('')
        setLastName('')
        setEmail('')
        setUsername('')
        setPhoneNumber('')
        setPetName('')
    }

    async function UpdateData() {
        setUpdate(true)
        if(user) {
            setUser({
                ...user,
                FirstName: FirstName || user.FirstName,
                LastName: LastName || user.LastName,
                PhoneNumber: PhoneNumber || user.PhoneNumber,
                PetName: PetName || user.PetName,
                Email: Email || user.Email,
                Username: Username || user.Username,
            })
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
            const response = await httpRequestPut(update_seller, '', newProfile)
            if(response) {
                reset()
                toast({
                    description: "Profile updated successfully!",
                    className: 'text-black bg-white shadow-md'
                })
                setUpdate(false)
                return
            }
            toast({
                description: "Unable to update the profile!",
                className: 'text-black bg-white shadow-md'
            })
            setUpdate(false)
        } catch (error) {
            setUpdate(false)
            console.error("Try error: ", error)
        }
    }

    function cancelUpdate() {
        reset()
    }

    return (
        <main className='px-6 pt-5 pb-16 sm:px-2 sm:py-5 sm:pl-16 sm:pr-4 lg:px-5 xl:px-12'>
            <h1 className='text-lg font-medium'>Edit profile</h1>
            <section className='mt-4 shadow-md w-full md:w-[600px] p-4'>
                <p>Personal Information</p>
                <hr className='w-full border border-gray-200 mt-4'/>
                <div className='flex flex-col sm:flex-row gap-3 w-full mt-5'>
                    <div className='w-full'>
                        <p className='text-xs font-medium'>First Name</p>
                        <Input
                            Type='text'
                            placeholder={user?.FirstName}
                            value={FirstName}
                            onchange={(e: React.ChangeEvent<HTMLInputElement>)=> setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <p className='text-xs font-medium'>Last Name</p>
                        <Input
                            Type='text'
                            placeholder={user?.LastName}
                            value={LastName}
                            onchange={(e: React.ChangeEvent<HTMLInputElement>)=> setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-3 w-full mt-5'>
                    <div className='w-full'>
                        <p className='text-xs font-medium'>Email</p>
                        <Input
                            Type='email'
                            placeholder={user?.Email}
                            value={Email}
                            onchange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <p className='text-xs font-medium'>Username</p>
                        <Input
                            Type='text'
                            placeholder={user?.Username}
                            value={Username}
                            onchange={(e: React.ChangeEvent<HTMLInputElement>)=> setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-3 w-full mt-5'>
                    <div className='w-full'>
                        <p className='text-xs font-medium'>Phone no.</p>
                        <Input
                            Type='tel'
                            placeholder={user?.PhoneNumber}
                            value={PhoneNumber}
                            onchange={(e: React.ChangeEvent<HTMLInputElement>)=> setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <p className='text-xs font-medium'>Pet name</p>
                        <Input
                            Type='text'
                            placeholder={user?.PetName}
                            value={PetName}
                            onchange={(e: React.ChangeEvent<HTMLInputElement>)=> setPetName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex justify-end gap-2 items-center mt-8 font-semibold'>
                    <button className='shadow-md py-2 w-20 rounded-md text-xs' onClick={cancelUpdate}>Cancel</button>
                    <button className='py-2 w-20 rounded-md bg-blue-600 text-white text-xs' onClick={UpdateData}>{update ? 'Saving...' : 'Save'}</button>
                </div>
            </section>
        </main>
    )
}
