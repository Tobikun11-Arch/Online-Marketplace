"use client"
import axios from 'axios';
import '../auth/Css/load.css'
import React, { FormEvent, useState } from 'react'
import {useRouter} from 'next/navigation';
import {useForm} from '../hooks/useForm'

export default function LoginForm() {

  const [isClick, setHide] = useState(false);

  const Clicked = (e: FormEvent<HTMLElement>) => {

      e.preventDefault();
      setHide((prevState) => !prevState);

  }

  const { formData, handleChange, setFormData } = useForm({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
  });

  const [message, setMessage] = useState('');
  const [messageLogin, setMessagelogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false)
  const [option, setOption] = useState<string | null>(null)

  const handlePop = () => setOpen(true);

  const HandleOption = (event: React.ChangeEvent<HTMLSelectElement>) => {

    setOption(event.target.value)

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if(formData.FirstName === '' || formData.LastName === '' || formData.Email === '' || formData.Password === '' || !option) {

      setMessage('Please fill all fields');

    }
    
    else {

    try {

      setMessage('')
        const DatawithOption = {

          ...formData,
          Role: option

        };

        await axios.post('https://online-marketplace-backend-six.vercel.app/api/users/register', DatawithOption, { 
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        setFormData({FirstName: '', LastName: '', Email: '', Password: ''});
        setOption(null)

    } 
    
    catch (error) {

        console.error('There was a problem with the fetch operation:', error);

    }

  }

  };


  if(loader) {

    return(
        <>
        
        <div className="loader-container">
      <div className="spinner"></div>
    </div>

        </>
    )

}



  //Login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); //user details to server post in server.ts to insert in database

    
    if(email === '' || password === '') {

      setMessagelogin('Invalid Email or Password');

    }

    else {

    try {
      setLoader(true)
    const response = await axios.post('https://online-marketplace-backend-six.vercel.app/api/users/login', { Email: email, Password: password }, {
          headers: {
              'Content-Type': 'application/json',
          },         
      });

        localStorage.removeItem('FirstName')
        localStorage.removeItem('LastName')
        const { token, user } = response.data;
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user));

      if(user.Role === 'Buyer') {

        router.push('/Client/ClientDashboard')

      }

      else {

        localStorage.removeItem('activeItem')
        router.push('/SellerDashboard/Home')

      }


    } 
    
    catch (error) {
      
      setLoader(false)
      router.push('/');
      setMessagelogin('Invalid Email or Password')

    }

  }

  };


  return (
   <>


   {isClick ? (
    <>

      {/**Register area */}
      

   <div className="Main w-full min-h-screen bg-gray-950 flex justify-center items-center">

   {open && (
  message ? (
<div role="alert" className="alert alert-error w-4/5 top-3 absolute flex">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>{message}</span>
</div>
  ) : (
 <>
 
 <div role="alert" className="alert alert-success w-4/5 top-3 absolute flex">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Verification link sent to your email. Please confirm it.</span>
</div>
    
 </>
  )
)}

<div className="sm:w-4/6 sm:h-4/5 sm:rounded-3xl flex justify-center items-center">


<div className="sm:mt-20 w-full sm:ml-10 ml-5">
<h1 className='text-gray-500 text-xs sm:text-xl'>Start for Free</h1>

<h1 className='text-white font-semibold w-5/6 text-2xl'>Create new Account</h1>

<p className='text-white mt-4 sm:text-base text-sm'>Already a Member? <a className='text-blue-700' href="" onClick={Clicked}>Login</a></p>   

<div className="Form">
<form action="" className='w-full flex-col sm:w-96' onSubmit={handleSubmit}>

<div className="mt-6">
<input type="text" name="FirstName" id="FirstName" placeholder='First Name' className='placeholder-large w-2/5 bg-transparent text-white border border-slate-400 outline-none pl-3 rounded-lg h-12 input-width' onChange={handleChange} value={formData.FirstName}/> 

<input type="text" name="LastName" id="LastName" placeholder='Last Name' className='placeholder-large w-2/4 ml-2 bg-transparent text-white border border-slate-400 outline-none pl-3 rounded-lg h-12 input-width' onChange={handleChange} value={formData.LastName}/> <br />
</div>

<input type="email"  name="Email" placeholder='Email' className='placeholder-large mt-3 w-11/12 bg-transparent text-white border border-slate-400 outline-none pl-3 rounded-lg h-12' onChange={handleChange} value={formData.Email}/>
<br />
<input type="password" name="Password" placeholder='Password' className='placeholder-large mt-3  w-11/12 bg-transparent text-white border border-slate-400 outline-none pl-3 rounded-lg h-12' onChange={handleChange} value={formData.Password}/>

<select className="select text-white border-slate-400 bg-transparent w-1/2 mt-3" value={option || ''} onChange={HandleOption}>
  <option disabled selected value={''}>Buyer or Seller</option>
  <option className='text-black'>Buyer</option>
  <option className='text-black'>Seller</option>
</select>

<div className="w-11/12 flex justify-center">
<button  className='px-10 py-3 bg-transparent text-white border text-xs font-bold border-slate-400 rounded-2xl mt-10 hover:bg-black flex justify-center' onClick={handlePop}>Create Account</button>


</div>

</form>

</div>
</div>
</div>
</div> 
    
    </>
   ) : (
    <>
    
    <div className="Main w-full min-h-screen bg-gray-950 flex justify-center items-center">

    {messageLogin ? (
  <>
  
  <div role="alert" className="alert alert-warning w-4/5 top-3 absolute flex">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <span>{messageLogin}</span>
</div>

  </>
) : (
  ''
)}

<div className="sm:w-4/6 sm:h-4/5 sm:rounded-3xl flex justify-center items-center">

<div className="sm:mt-20 w-full sm:ml-10 ml-5">
<h1 className='text-gray-500 text-xs sm:text-xl'>Welcome Back</h1>

<h1 className='text-white font-semibold w-5/6 text-2xl'>Log In to Your Account</h1> 

<p className='text-white mt-4 sm:text-base text-sm'>New here? <a className='text-blue-700' href="" onClick={Clicked}>Register</a></p>   

<div className="Form">

<form action="" className='w-full flex-col sm:w-96' onSubmit={handleLogin}>

<div className="mt-6">

</div>
<input type="email" placeholder='Email' className='placeholder-large mt-3 w-11/12 bg-transparent text-white border border-slate-400 outline-none pl-3 rounded-lg h-12'  value={email} onChange={(e) => setEmail(e.target.value)}/>
<br />
<input type="password" placeholder='Password' className='placeholder-large mt-3  w-11/12 bg-transparent text-white border border-slate-400 outline-none pl-3 rounded-lg h-12'  value={password} onChange={(e) => setPassword(e.target.value)}/>

<div className="w-11/12 flex justify-center">
<button className='px-10 py-3 bg-transparent text-white border text-xs font-bold border-slate-400 rounded-2xl mt-10 hover:bg-black flex justify-center'>Login</button>
</div>

</form>

</div>

</div>

</div>

</div> 

    </>
   )}


   </>
  )
}