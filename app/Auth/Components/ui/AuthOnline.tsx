import React from 'react'
import AuthStyle from './AuthStyle'

const AuthOnline = () => {
    return (
        <div className='w-full h-12 flex mt-5 gap-2'>
            <AuthStyle>
                <div className={`w-6 h-6 rounded-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png')] bg-cover bg-center`}></div>
                <p className='text-black text-xs'>Google</p>
            </AuthStyle>

            <AuthStyle>
                <div className={`w-8 h-8 rounded-full bg-[url('https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg')] bg-cover bg-center`}></div>
                <p className='text-black text-xs'>Facebook</p>
            </AuthStyle>
        </div>
    )
}

export default AuthOnline
