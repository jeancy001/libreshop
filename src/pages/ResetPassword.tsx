import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../constants/API_URL'
import { useNavigate } from 'react-router-dom'

const  ResetPassword:React.FC =()=>{
    const [email, setEmail] = useState<string>("")
    const [code, setCode] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [success, setSuccess]= useState<string>("")
    const [showPassword, setShowPassword]= useState<boolean>(false)
    const navigate = useNavigate()
    const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()
      try {
        setLoading(true)
        if(!email ||!code ||!newPassword)return setError("All  fields  are  required.")
        await axios.post(`${API_URL}/api/auth/reset-password`,{
         email,
         code,
         newPassword
          })
          setEmail("")
          setCode("")
          setNewPassword("")
          setLoading(false)
          setSuccess("Your password  has  been  changed  successfully! ")
          navigate("/redirect")
           
        } catch (err) {
                setLoading(false)
        
                // Strongly type the error as AxiosError
                const error = err as AxiosError<{ message: string }>
            
                if (error.response && error.response.data && error.response.data.message) {
                  setError(error.response.data.message)
                } else {
                  setError("An unexpected error occurred while resetting your account.")
                }
            
                console.error("Request error:", error)
      }
    }
  return (
    <div className='flex flex-col items-center justify-center mt-4'>
        <div className="block">
            <span className='text-green-700 text-2xl text-center mt-5'>Your  code was  sent successfully</span>
        </div>
        <h3 className='text-2xl mt-4 text-gray-500 border-b-2 '>Reset  Your  Password </h3>
        <div className="flex flex-col items-center justify-center m-10">
        <form className=''onSubmit={handleSubmit}>
            <div className="block">
                {error &&(<span className='text-2xl text-center text-red-600 mt-3 mb-2'>{error}</span>)}
                {success &&(<span className='text-2xl text-center text-green-600 mt-3 mb-2'>{success}</span>)}
            </div>
            <input className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type='email' placeholder='Your email  to  Confirm'onChange={(e)=>setEmail(e.target.value)}/>
            <input className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' placeholder='Your  code . Ex 123456 or 1d42b4'onChange={(e)=>setCode(e.target.value)}/>
             <div className="relative w-full ">
            <input className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type={showPassword?"text":"password"} placeholder='New Password 'onChange={(e)=>setNewPassword(e.target.value)}/>
            <button className='absolute top-[2.15em] right-4 text-sm text-blue-500 hover:underline md:top-[1.2em]' onClick={()=>setShowPassword(!showPassword)}>{showPassword? 'hide':'show'}</button>
            </div>
            <div className="flex flex-row items-center   between">
            <button className="border border-b-1 p-3 rounded-lg text-blue-600 mt-5 border-blue-600  hover:bg-blue-600 hover:text-gray-300 duration-300 ease-in" type='submit'>{loading?"Saving...":"Reset password"}</button>
              <a href='/recovery' className='ml-10 mt-5 text-blue-600 hover:border-b-2 border-blue-600 duration-300 ease-in cursor-pointer'>
                Resend a Code
              </a>
            </div>
        </form>
        </div>
     </div>
  )
}

export default ResetPassword