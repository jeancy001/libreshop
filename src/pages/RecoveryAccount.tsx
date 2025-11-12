import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../constants/API_URL'
import { useNavigate } from 'react-router-dom'

const RecoveryAccount:React.FC=()=>{
    const [email, setEmail]= useState<string>("")
    const [laoding, setLoading] = useState<boolean>(false)
    const [error, setError]= useState<string>("")
    const[success, setSuccess] = useState<string>("")

    const navigate = useNavigate()
    const handleSubmit = async(e:React.FormEvent)=>{
     e.preventDefault()
     try {
        setLoading(true)
        if(!email)return setError("Fill your  email ")
        await axios.post(`${API_URL}/api/auth/request-code`,{email})
        setSuccess("The Code was sent in your Email successfully!")
        setEmail("")
        setLoading(false)
        navigate("/reset")
     } catch (err:unknown) {
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
    <div className='flex  flex-col items-center justify-center  '>
        <h3 className='text-2xl text-gray-600 mt-5 border-b-2'>Recovery Account</h3>
        
        <div className="flex flex-col items-center  ">
            <span className='text-gray-400 mt-5'>Send  a code to your email  with  6 characters.</span>
            <div className="block">
                {error &&(<span className='text-2xl text-red-700 text-center mt-2 mb-2'>{error}</span>)}
            </div>
            <div className="block">
                {success &&(<span className='text-2xl text-green-700 text-center mt-2 mb-2'>{success}</span>)}
            </div>
            <form onSubmit={handleSubmit}className='mb-5'>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' type='email' placeholder='Reset  now . (example@gmail.com)'/>
                 <button type='submit' className='text-blue-600 border border-b-1 p-2 mt-5 border-blue-600 rounded-lg  hover:bg-blue-600 hover:text-gray-200  duration-300 ease-in'> {laoding?"Code sent...":"Send a Code"}</button>
            </form>
        </div>
    </div>
  )
}

export default RecoveryAccount