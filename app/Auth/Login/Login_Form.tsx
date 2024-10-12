import React from 'react'
import LoginImage from '../Components/LoginImage'
import LoginWrapper from '../Components/ui/LoginWrapper'
import Form from '../Components/Form'

const Login_Form = () => {
    return (
        <>
            <div className='h-3/4 w-4/5 bg-white flex shadow-2xl'>
                <LoginImage/>
                <div className='w-full sm:w-3/5'>
                    <LoginWrapper>
                        <Form />
                    </LoginWrapper>
                </div>
            </div>
        </>
    )
}

export default Login_Form