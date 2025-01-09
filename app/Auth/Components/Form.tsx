import React, { useCallback, useState, useEffect } from 'react'
import AuthOnline from './ui/AuthOnline'
import Input, { LoginInput, SingUpInput } from './ui/Input'
import IconSide, { PasswordInput } from './ui/IconSide'
import { Mail, LockKeyhole } from 'lucide-react'
import { useForm } from '../StateHandlers/Form'
import { useNewUser } from '../StateHandlers/RegisterForm'
import { userLog } from '../../SellerDashboard/axios/axios'
import { useRouter } from 'next/navigation'
import { leapfrog } from 'ldrs'
import { RegisterAuth, LoginAuth } from '../actions/authAction'
import adjectives from './ui/adjectives'
import { newRegister } from '../../SellerDashboard/axios/axios'
import axios, { AxiosError } from 'axios'; 

const Form = () => {
        const { isForm, setForm, Email, setEmail, Password, setPassword } = useForm()
        const { isPasswordVisible, emailSent, sentMail, PhoneNumber, setRole, Role, PetName, setUsername, setExistedEmail, joinSeller } = useNewUser()
        const [ Error , seterror ] = useState<boolean>(false)
        const [ loading, setLoading ] = useState<boolean>(false)
        const [ messageLogin, setmessageLogin ] = useState<boolean>(false)
        const [ isStart, setStart ] = useState<boolean>(false)
        const router = useRouter()

        const Form_Set = useCallback(()=> {
            setForm(true)
            setEmail(''), setPassword('')
        }, [isForm])

        useEffect(() => {
            if (typeof window !== 'undefined') {
                leapfrog.register()
            }
        }, []);

        useEffect(()=> {
            const SignUpAction = async()=> {
                const session_register = await RegisterAuth()  
                if(!session_register) { console.log("No Registration working") }
                if(session_register) {
                    const userRole = localStorage.getItem('Role')
                    console.log('userRole: ', userRole)
                        const usernameParts = session_register.email?.split('@') || []
                        const developer = "TobiNejiKai" 
                        const fullName = session_register.name?.split(" ") || []
                        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
                        const noun = developer[Math.floor(Math.random() * developer.length)];
                        const number = Math.floor(Math.random() * 1000);    
                        const generatedUsername = `${adjective}${noun}${number}`; //set a random username
                        setUsername(generatedUsername);   
                        {joinSeller ? setRole('seller') : setRole('buyer')}
                        try {
                            setLoading(true)
                            const userDetails = {
                                FirstName: fullName[0], LastName: fullName[1], PhoneNumber, PetName, Email: session_register.email, Password: usernameParts[0], Role: userRole, Username: generatedUsername
                            }
                            const response = await newRegister.post('', userDetails)
                            if(response.data.message === "success register(socmed)") {
                                setStart(true)
                            }
                        } catch (error: any) {
                            setLoading(false);
                
                            // Check if the error is an AxiosError
                            if (axios.isAxiosError(error)) {
                                const axiosError = error as AxiosError;
                
                                // Log the 400 status error explicitly
                                if (axiosError.response?.status === 400) {
                                    setStart(true)
                                } else {
                                    console.error("Axios Error:", axiosError.message);
                                }
                            } else {
                                // Handle non-Axios errors
                                console.error("Unexpected Error:", error);
                            }
                        }
                }
            }

            const SignInAction = async() => {
                const session_login = await LoginAuth()
                if(!session_login) { console.log("No Login working") }
                if(session_login) {
                    setLoading(true)
                    const usernameParts = session_login.email?.split('@') || []
                    const userDetails = {
                        Email: session_login.email, 
                        Password: usernameParts[0] 
                    }
                    const response =  await userLog.post('', userDetails, {withCredentials: true})
                    if (response.data.message === 'Login successful') {
                        const { user } = response.data;
                        localStorage.setItem('user', JSON.stringify(user))
                        if (user.Role === 'buyer') {
                            router.push('/');
                            setmessageLogin(false), setLoading(false), sentMail(false), setEmail(''), setPassword('')
                        } else {
                            localStorage.removeItem('activeItem')
                            router.push('/seller');
                            setmessageLogin(false), setLoading(false), sentMail(false), setEmail(''), setPassword('')
                        }
                        setLoading(false)
                    } else {
                        console.error('Error:', response.data.error); // Handle error if message is not 'Login successful'
                    }
                }
            }

            // SignInAction()
            SignUpAction()
            if(isStart) {
                SignInAction()
            }
        }, [joinSeller, PhoneNumber, PetName, Role, isStart])

        const handleSubmit = async () => {
            if(!Email || !Password) {
                seterror(true)
                return;
            }
            seterror(false)
            setLoading(true)

            try {
                const userDetails = { Email, Password }
                const response =  await userLog.post('', userDetails, {withCredentials: true})
                setLoading(false)
                if (response.data.message === 'Login successful') {
                    const { user } = response.data;
                    localStorage.setItem('user', JSON.stringify(user))
                    if (user.Role === 'buyer') {
                        router.push('/');
                        setmessageLogin(false), setLoading(false), sentMail(false), setEmail(''), setPassword('')
                    } else {
                        localStorage.removeItem('activeItem')
                        console.log("user: ", user)
                        router.push('/seller');
                        setmessageLogin(false), setLoading(false), sentMail(false), setEmail(''), setPassword('')
                    }
                } else {
                    console.error('Error:', response.data.error); // Handle error if message is not 'Login successful'
                }
            } 

            catch (error) {
                seterror(true)
                setmessageLogin(true)
                setLoading(false);
                console.log('Error: ', error)
            }
        }

        return (
            <div className="h-screen w-screen flex justify-center items-center sm:h-full sm:w-full">
                <div className='py-5 cursor-default w-3/4 sm:w-full'>
                    <div className="flex gap-1 items-center">
                        <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('/assets/sajuBazaarLogo.webp')] bg-cover bg-center`}></div>
                        <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
                    </div>

                    <h1 className='text-gray-950 font-bold mt-4 text-2xl'>Log in to your Account</h1>  
                    <p className='text-xs text-gray-400'>Welcome back! Select method to log in:</p>
                    <AuthOnline/>
                    <p className='text-gray-400 text-sm flex justify-center mt-5'>or continue with email</p>
                    <div className="flex flex-col mt-5">
                        <IconSide Icon={Mail} color='gray' size={18}>
                            <Input type="email" className={`${LoginInput}`} placeholder='Email' value={Email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
                        </IconSide> 
                        <p className='text-transparent text-xs'>
                            {Error && !Email ? (
                                <span className='text-red-500'>Email is required</span>
                            ) : null}
                            {emailSent ? (
                                <span className='text-red-500'>Please check your email to verify your account!</span>
                            ) : messageLogin ? (
                                <span className='text-red-500'>Invalid email or password.</span>
                            ) : null}
                            Email
                        </p>

                        <PasswordInput Icon={LockKeyhole}>
                            <Input  type={isPasswordVisible ? 'text' : 'password'} className={`${SingUpInput}`} placeholder='Password'  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={Password}/>
                        </PasswordInput>
                        <p className='text-transparent text-xs'>
                            {Error && !Password ? (
                                <span className='text-red-500'>Password is required</span>
                            ) : null}
                            {messageLogin ? ( 
                                <span className='text-red-500'>Please try again!</span>
                            ) : null}
                            Password
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-2 items-center">
                            <Input type="checkbox" defaultChecked className="checkbox border w-4 h-4 border-gray-400 rounded-none [--chkbg:theme(colors.indigo.600)] [--chkfg:white]"></Input>
                            <p className='text-xs text-gray-400 font-medium'>Remember me</p>
                        </div>
                        <p className='text-gray-400 text-xs font-semibold'>Forgot Password?</p>
                    </div>

                    <button className='w-full bg-[#065AD7] py-2 rounded-md flex items-center justify-center mt-3' onClick={handleSubmit}>
                    {loading ? (<>
                        <div className="flex items-center gap-2">
                            <span className='text-xs font-bold text-gray-200 hover:text-white'>Logging in</span>
                            <l-leapfrog
                            size="25"
                            speed="2.5" 
                            color="white" 
                            ></l-leapfrog>
                        </div>
                    </>):
                    (<>
                        <span className='text-xs font-bold text-gray-200 hover:text-white'>Log in</span>
                    </>)}
                    </button>
                    <p className='text-gray-500 text-xs font-semibold mt-6 flex gap-1 justify-center'>Don't have an account? <span className='text-blue-700' onClick={Form_Set}>Create an account</span></p>
                </div>
            </div>
        )
    }

    export default Form
