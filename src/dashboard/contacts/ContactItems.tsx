import React, { useEffect, useState } from 'react'
import { Contact } from '../../constants/Contact'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../../constants/API_URL'
import ContactCard from './ContactCard'
import { toast, ToastContainer } from 'react-toastify'

const  ContactItems:React.FC=()=>{
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(()=>{
    const getContacts = async()=>{
      try {
        const response = await axios.get(`${API_URL}/api/contact/`)
        console.log("Contact", response.data.contact)
        setContacts(response.data.contact)
      } catch (error) {
        const err  = error as  AxiosError<{message:string}>
        const message = err?.response?.data?.message
       toast.error(message)
        
      }
    }
    getContacts()
  },[contacts])
const handleDelete = async(id:string)=>{
  try {
    await axios.delete(`${API_URL}/api/contact/${id}`)
    toast.success("Contact deleted  Successfully!")
  } catch (error) {
    const err = error as AxiosError<{message:string}>
    const message = err?.response?.data?.message
    toast.error(message)
  }
}
  return (
    <div>
      {contacts.length >0 ?(
        <ContactCard onDelete={handleDelete} contact={contacts}/>
        
      ):(
        <div> 
          <span>No Contacts  found! </span>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default ContactItems