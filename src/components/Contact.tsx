import axios, { AxiosError } from 'axios'
import React, { FormEvent, useState } from 'react'
import { API_URL } from '../constants/API_URL'
import { toast, ToastContainer } from 'react-toastify'

const  Contact:React.FC =()=>{
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [loading, setLoding] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("")


    const handlSubmitContact = async(e:FormEvent)=>{
        e.preventDefault()
        try {
            setLoding(true)
            if(!name ||!email ||!description)return setError("All  fields are required.")
         await axios.post(`${API_URL}/api/contact/`,{
         name,
         email,
         description
          })
          setLoding(false)
          setName("")
          setEmail("")
          setDescription("")
          toast.success("Feedback  sent successfully!")
        } catch (error:unknown) {
            const err =error as AxiosError<{message:string}>
            setError(err?.response?.data?.message)
        }
    }
  return (
    <div className=" flex flex-col md:flex-row  items-center mt-5 mb-5 justify-between">
        
        <div className="flex flex-col ml-2">
        <h2 className='ml-2 text-2xl text-pink-600 '>Contact Us / FeedBack </h2>
         <span>Informations </span>
        </div>
        <div className="flex flex-col ml-auto m-5 bg-pink-600 p-5 shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded">
             <span className='text-center text-gray-200 text-2xl border-b-2 mb-5 '>Contact Form</span>

             <form  onSubmit={handlSubmitContact}>
                <div className="block">
                    {error &&(<span className='text-2xl text-gray-200 '>{error}</span>)}
                </div>
                <input value={name} onChange={(e)=>setName(e.target.value)}type="text" className='w-full pr-16 p-2 m-4 focus:outline-none focus:ring-2 rounded' placeholder='Name'/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full pr-16 p-2 m-4 focus:outline-none focus:ring-2 rounded'  placeholder='Email'/>
                <textarea  value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full pr-16 p-2 m-4 focus:outline-none focus:ring-2 rounded' rows={3}cols={2} placeholder='What is  your  issues or  FeedBack ? '></textarea>
                 <button className=' ml-4 w-full pr-16 text-center rounded bg-gray-300 hover:bg-blue-800 hover:text-gray-200 font-bold duration-300 ease-in border-blue-800 text-w border border-p-2 p-3 '>{loading?"Sending...":"Send"}</button>
             </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Contact