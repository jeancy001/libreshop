import React, { useEffect, useState } from 'react'
import { User } from '../../constants/User'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../../constants/API_URL'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import UserCard from './UserCard'


const  UserItems:React.FC=()=>{
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const {token} = useAuth()
     

    useEffect(()=>{
        const getAllUsers = async()=>{
            setLoading(true)
            try {
              const response = await axios.get(`${API_URL}/api/auth/`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
              })  
              console.log(response.data.users)
              setUsers(response.data.users)
              setLoading(false)
            } catch (error) {
                const err = error as AxiosError<{message:string}>
                const message = err?.response?.data?.message
                toast.error(message)
                setLoading(false)
            }
        }
    getAllUsers()
    },[token])

    const handleDeleteUsers =async(id:string)=>{
        try {
          await axios.delete(`${API_URL}/api/auth/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
          }) 
          toast.success("User deleted successfully!")
          setUsers(prev=>prev.filter(user=>user._id !== id))

        } catch (error) {
               const err = error as AxiosError<{message:string}>
                const message = err?.response?.data?.message
                toast.error(message)
                setLoading(false)
        }
    }
    if(loading) return <span className='text-blue-600 text-2xl text-center'> Loading...</span>
  return (
    <div>
        <UserCard onDelete={handleDeleteUsers } user={users}/>
    </div>
  )
}

export default UserItems