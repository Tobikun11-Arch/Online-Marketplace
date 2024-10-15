import React, { useCallback, useState } from 'react'
import AuthOnline from './ui/AuthOnline'
import Input, { LoginInput, SingUpInput } from './ui/Input'
import IconSide, { PasswordInput } from './ui/IconSide'
import { Mail, LockKeyhole } from 'lucide-react'
import { useForm } from '../StateHandlers/Form'
import { useNewUser } from '../StateHandlers/RegisterForm'

const RegistrationForm = () => {
    const { isForm, setForm } = useForm()
    const { setEmail, setPassword, setUsername, Username, Password, FirstName , LastName, Email, setConfirmPassword, ConfirmPassword, isPasswordVisible } = useNewUser()
    const [ Error , seterror ] = useState<boolean>(false)
    const adjectives = ['Happy', 'Sunny', 'Clever', 'Swift', 'Bright', 'Cool', 'Witty', 'Brave'];
    const nouns = ['Tiger', 'Dolphin', 'Phoenix', 'Eagle', 'Lion', 'Wolf', 'Bear', 'Fox'];

    const RegisterAccount = async () => {
        if(!Email || !Password || !ConfirmPassword || !Email.includes('@')) {
            seterror(true)
            return;
        }

        seterror(false)
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const number = Math.floor(Math.random() * 1000);
        setUsername(`${adjective}${noun}${number}`);

    }

    const Form_Set = useCallback(()=> {
        setForm(false)
    }, [isForm])

    return (
        <div className="h-screen w-screen flex justify-center items-center sm:h-full sm:w-full">
        <div className='py-5 cursor-default w-3/4 sm:w-full '>
            <div className="flex gap-1 items-center">
                <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg')] bg-cover bg-center`}></div>
                <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
            </div>

            <h1 className='text-gray-950 font-bold mt-4 text-2xl'>Sign Up for <span className='text-blue-900'>SajuBazaar</span></h1>  
            <p className='text-xs text-gray-400'>Join as buyer/seller</p>

            <AuthOnline/>
            <p className='text-gray-400 text-sm flex justify-center mt-5'>or sign up with</p>

            <div className="flex flex-col mt-5">
                <IconSide Icon={Mail} color='gray' size={18}>
                    <Input type="email" className={`${LoginInput}`} placeholder='Email' value={Email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
                </IconSide> 
                <p className='text-transparent text-xs'>
                    {Error && (!Email ? (
                        <span className='text-red-500'>Email is required</span>
                    ) : !Email.includes('@') ? (
                        <span className='text-red-500'>Please enter a valid email address</span>
                    ) : null)}
                    Email
                </p>    

                <PasswordInput Icon={LockKeyhole}>
                    <Input type={isPasswordVisible ? 'text' : 'password'} className={`${SingUpInput}`} placeholder='Password'  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={Password}/>
                </PasswordInput>
                <p className='text-transparent text-xs'>{Error && !Password && <><span className='text-red-500'>Password is required.</span></>}Password</p>

                <IconSide Icon={LockKeyhole} color='gray' size={18}>
                    <Input type="password" className={`${LoginInput}`} placeholder='Confirm Password'  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setConfirmPassword(e.target.value)} value={ConfirmPassword}/>
                </IconSide>
                <p className='text-transparent text-xs'>
                    {Error && !ConfirmPassword ? (
                        <span className='text-red-500'>Please confirm your password</span>
                    ) : Password && ConfirmPassword && Password !== ConfirmPassword ? (
                        <span className="text-red-500">Passwords do not match.</span>
                    ) : (
                        'Confirm'
                    )}
                </p>
            </div>

            <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-2 items-center">
                        <Input type="checkbox" defaultChecked className="checkbox border w-4 h-4 border-gray-400 rounded-none [--chkbg:theme(colors.indigo.600)] [--chkfg:white]"></Input>
                        <p className='text-xs text-gray-400 font-medium'>Remember me</p>
                    </div>
                    <p className='text-gray-400 text-xs font-semibold'></p>
                </div>

                <button className='w-full bg-[#065AD7] py-2 rounded-md flex items-center justify-center mt-3' onClick={RegisterAccount}>
                    <span className='text-xs font-bold text-gray-200 hover:text-white'>Sign Up</span>
                </button>

                <p className='text-gray-500 text-xs font-semibold mt-6 flex gap-1 justify-center'>Already have an account?<span className='text-blue-700' onClick={Form_Set}>Log in</span></p>
            {/* <div className='mt-4 text-black'>
                <label>
                    <input type="radio" name="role" value="buyer" /> Buyer
                </label>
                <label className='ml-4'>
                    <input type="radio" name="role" value="seller" /> Seller
                </label>
            </div> */}

        </div>
    </div>
    )
}

export default RegistrationForm
