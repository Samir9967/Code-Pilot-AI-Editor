import Image from 'next/image'
import React from 'react'
import SignInFormClient from '@/features/auth/components/signin-form-client'

const SignInPage = () => {
  return (
    <div className='space-y-6 flex flex-col items-center justify-center'>
        <Image src={"/logo.svg"} alt="Login-Image" height={300} 
        width={300}
        className='m-6 object-cover'
        />
        <SignInFormClient />
    </div>
  )
}

export default SignInPage