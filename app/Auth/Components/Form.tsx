    import React, { useCallback, useState } from 'react'
    import AuthOnline from './ui/AuthOnline'
    import Input, { LoginInput, SingUpInput } from './ui/Input'
    import IconSide, { PasswordInput } from './ui/IconSide'
    import { Mail, LockKeyhole } from 'lucide-react'
    import { useForm } from '../StateHandlers/Form'
    import { useNewUser } from '../StateHandlers/RegisterForm'
    import { userLog } from '../../SellerDashboard/axios/axios'
    import { useRouter } from 'next/navigation'
    import Cookies from 'js-cookie'

    const Form = () => {
        const { isForm, setForm, Email, setEmail, Password, setPassword } = useForm()
        const { isPasswordVisible } = useNewUser()
        const [ Error , seterror ] = useState<boolean>(false)
        const [ loading, setLoading ] = useState<boolean>(false)
        const [ messageLogin, setmessageLogin ] = useState<string>('')
        const router = useRouter()

        const Form_Set = useCallback(()=> {
            setForm(true)
        }, [isForm])

        const handleSubmit = async () => {
            if(!Email || !Password) {
                seterror(true)
                return;
            }

            seterror(false)
            setLoading(true)
            console.log("before try", process.env.NEXT_PUBLIC_LOGIN)

                try {
                    const userDetails = { Email, Password }
                    const response =  await userLog.post('', userDetails)
                    setLoading(false)

                    if (response.data.message === 'Login successful') {
                        const { user, accessToken } = response.data;
                        Cookies.set('accessToken', accessToken); 
                        const token = Cookies.get('accessToken');
                        console.log("Retrieved Token:", token);
                        if (user.Role === 'buyer') {
                            router.push('/Client/ClientDashboard');
                            
                        } else {
                            localStorage.removeItem('activeItem')
                            router.push('/SellerDashboard/Home');
                        }
                    }

                    else {
                        console.error('Error:', response.data.error); // Handle error if message is not 'Login successful'
                    }
                } 

                catch (error) {
                    setLoading(false);
                    console.log('Catch area', error)
                }
            }

        return (
            <div className="h-screen w-screen flex justify-center items-center sm:h-full sm:w-full">
                <div className='py-5 cursor-default w-3/4 sm:w-full'>
                    <div className="flex gap-1 items-center">
                        <div className={`w-8 h-8 rounded-full bg-gray-400 bg-[url('https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg')] bg-cover bg-center`}></div>
                        <h1 className='text-blue-800 font-bold'>SajuBazaar</h1>
                    </div>

                    <h1 className='text-gray-950 font-bold mt-4 text-2xl'>Log in to your Account</h1>  
                    <p className='text-xs text-gray-400'>Welcome back! Select method to log in:</p>
                    <AuthOnline/>
                    <p className='text-gray-400 text-sm flex justify-center mt-5'>or continue with email</p>
                    <div className="flex flex-col gap-3 mt-5">
                        <IconSide Icon={Mail} color='gray' size={18}>
                            <Input type="email" className={`${LoginInput}`} placeholder='Email' value={Email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)}/>
                        </IconSide> 

                        <PasswordInput Icon={LockKeyhole}>
                            <Input  type={isPasswordVisible ? 'text' : 'password'} className={`${SingUpInput}`} placeholder='Password'  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} value={Password}/>
                        </PasswordInput>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-2 items-center">
                            <Input type="checkbox" defaultChecked className="checkbox border w-4 h-4 border-gray-400 rounded-none [--chkbg:theme(colors.indigo.600)] [--chkfg:white]"></Input>
                            <p className='text-xs text-gray-400 font-medium'>Remember me</p>
                        </div>
                        <p className='text-gray-400 text-xs font-semibold'>Forgot Password?</p>
                    </div>

                    <button className='w-full bg-[#065AD7] py-2 rounded-md flex items-center justify-center mt-3' onClick={handleSubmit}>
                        <span className='text-xs font-bold text-gray-200 hover:text-white'>Log in</span>
                    </button>

                    <p className='text-gray-500 text-xs font-semibold mt-6 flex gap-1 justify-center'>Don't have an account? <span className='text-blue-700' onClick={Form_Set}>Create an account</span></p>
                </div>
            </div>
        )
    }

    export default Form
