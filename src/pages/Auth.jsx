import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = () => {
  return (
    <div className='flex max-sm:flex-col mt-20 gap-5 w-full sm:justify-center max-sm:items-center'>
      <Login/>
      <Register/>
    </div>
  )
}

export default Auth