import React, { useCallback, useState, useEffect } from 'react'
import AuthOnline from './ui/AuthOnline'
import Input, { LoginInput, SingUpInput } from './ui/Input'
import IconSide, { PasswordInput } from './ui/IconSide'
import { Mail, LockKeyhole } from 'lucide-react'
import { useForm } from '../StateHandlers/Form'
import { useNewUser } from '../StateHandlers/RegisterForm'
import { newRegister } from '../../SellerDashboard/axios/axios'
import { leapfrog } from 'ldrs'

const RegistrationForm = () => {
    const { isForm, setForm } = useForm()
    const { setEmail, setPassword, setUsername, Username, Password, FirstName , LastName, Email, setConfirmPassword, ConfirmPassword, isPasswordVisible, Role, setRole, sentMail} = useNewUser()
    const [ Error , seterror ] = useState<boolean>(false)
    const adjectives = ['Dab', 'Sunny', 'Clever', 'Swift', 'Bright', 'Cool', 'Witty', 'Brave'];
    const ButtonStyle = 'font-semibold rounded-md w-full border text-xs py-1 transition duration-200 hover:bg-blue-600 hover:text-white'
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ existedEmail, setExistedEmail ] = useState<string>('')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            leapfrog.register()
        }
    }, []);

    const RegisterAccount = async () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if(!Email || !Role || !Password || !ConfirmPassword || !Email.includes('@') || !passwordPattern.test(Password)) {
            seterror(true)
            return;
        }

        seterror(false)
        setLoading(true)
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = Password[Math.floor(Math.random() * Password.length)];
        const number = Math.floor(Math.random() * 1000);    
        const generatedUsername = `${adjective}${noun}${number}`; //set a random username
        setUsername(generatedUsername); 

        try {
            const userDetails = {
                FirstName, LastName, Email, Password, Role, Username: generatedUsername
            }

            await newRegister.post('', userDetails)
            setLoading(false)
            sentMail(true)
            setForm(false)
            setEmail(''), setPassword(''), setRole(''), setConfirmPassword('')
        } 

        catch (error: any) {
            setLoading(false)
            console.error("User registration failed:", error); 
            seterror(true)
            if (error.response) {
                setExistedEmail('Email is already registered'); // Handle client-side error (bad request)
            } 
            else {
                    setExistedEmail('An error occurred, please try again.'); // Handle other errors
            }
        }
    }   

    const Form_Set = useCallback(()=> {
        setForm(false)
    }, [isForm])

    return (
        <div className="h-screen w-screen flex justify-center items-center sm:h-full sm:w-full">
        <div className='py-5 cursor-default w-3/4 sm:w-full '>
            <div className="flex gap-1 items-center">
                <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('/assets/sajuBazaarLogo.webp')] bg-cover bg-center`}></div>
                <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
            </div>

            <h1 className='text-gray-950 font-bold mt-4 text-2xl'>Sign Up for <span className='text-blue-900'>SajuBazaar</span></h1>  
            <p className='text-xs text-gray-400'>Join as seller</p>

            <AuthOnline/>
            <p className='text-gray-400 text-sm flex justify-center mt-3'>or sign up with</p>

            <div className="flex flex-col mt-3">
                <IconSide Icon={Mail} color='gray' size={18}>
                    <Input type="email" className={`${LoginInput}`} placeholder='Email' value={Email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
                </IconSide> 
                <p className='text-transparent text-xs'>
                    {Error && (!Email ? (
                        <span className='text-red-500'>Email is required</span>
                    ) : !Email.includes('@') ? (
                        <span className='text-red-500'>Please enter a valid email address</span>
                    ) : existedEmail === 'Email is already registered' ? (
                        <span className='text-red-500'>Email is already registered</span>
                    ) : null)}
                    Email
                </p>    

                <PasswordInput Icon={LockKeyhole}>
                    <Input type={isPasswordVisible ? 'text' : 'password'} className={`${SingUpInput}`} placeholder='Password'  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={Password}/>
                </PasswordInput>
                <p className='text-transparent text-xs'>
                    {Error && (!Password ? (
                        <span className='text-red-500'>Password is required</span>
                    ) : Password.length < 8 ? (
                        <span className='text-red-500'>Password must be at least 8 characters</span>
                    ) : !/[A-Z]/.test(Password) ? (
                        <span className='text-red-500'>Password must contain an uppercase letter</span>
                    ) : !/[!@#$%^&*(),.?":{}|<>]/.test(Password) ? (
                        <span className='text-red-500'>Password must contain a special character</span>
                    ) : null)}
                    Password
                </p>

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
                {loading ? (<>
                    <div className="flex items-center gap-2">
                    <span className='text-xs font-bold text-gray-200 hover:text-white'>Signing Up</span>
                    <l-leapfrog
                    size="25"
                    speed="2.5" 
                    color="white" 
                    ></l-leapfrog>
                    </div>
                </>):
                (<>
                    <span className='text-xs font-bold text-gray-200 hover:text-white'>Sign Up</span>
                </>)}
            </button>

            {/**Deleted the role picker and need to adjust database schema for it*/}
            <p className='text-gray-500 text-xs font-semibold mt-3 flex gap-1 justify-center'>Already have an account?<span className='text-blue-700' onClick={Form_Set}>Log in</span></p>

        </div>
    </div>
    )
}

export default RegistrationForm
