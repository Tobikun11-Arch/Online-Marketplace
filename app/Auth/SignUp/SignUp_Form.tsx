import React from 'react'
import LoginImage from '../Components/LoginImage'
import RegistrationForm from '../Components/RegistrationForm'
import LoginWrapper from '../Components/ui/LoginWrapper'

const SignUp_Form = () => {
    return (
        <div className='sm:h-3/4 sm:w-3/5 md:w-5/6 lg:w-3/5 w-full bg-white flex shadow-2xl'>
        <div className='w-full flex justify-center items-center md:w-1/2'>
        <LoginWrapper>
            <RegistrationForm/>
        </LoginWrapper>
        </div>
        <LoginImage/>
    </div>
    )
}

export default SignUp_Form
