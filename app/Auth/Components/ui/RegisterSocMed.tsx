import { useEffect } from 'react'
import { SignUpGoogle, SignUpGithub } from '../../../Auth/actions/authAction'

const AuthOnline = () => {

    return (
        <div className='w-full h-11 flex mt-5 gap-2'>
            <form action={SignUpGoogle} className='w-full'>
                <button type='submit' className='bg-white flex items-center justify-center w-full h-full border border-gray-400 gap-1 rounded-md'>
                    <div className={`w-6 h-6 rounded-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png')] bg-cover bg-center`}></div>
                    <p className='text-black text-xs'>Google</p>
                </button>
            </form>
            <form action={SignUpGithub} className='w-full'>
                <button type='submit' className='bg-white flex items-center justify-center w-full h-full border border-gray-400 gap-2 rounded-md'>
                    <div className={`w-6 h-6 rounded-full bg-[url('https://cdn-icons-png.flaticon.com/512/25/25231.png')] bg-cover bg-center`}></div>
                    <p className='text-black text-xs'>Github </p>
                </button>
            </form>
        </div>
    )   
}

export default AuthOnline