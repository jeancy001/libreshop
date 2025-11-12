import React from 'react'
import { Contact } from '../../constants/Contact'
import { FaTrash } from 'react-icons/fa'

interface ContactProp{
    contact:Contact[]
    onDelete:(id:string)=>void
}
const ContactCard:React.FC<ContactProp>=({contact, onDelete})=>{
  return (
    <div className='flex flex-col'>
        <h3 className='w-full text-center text-2xl text-gray-500 border-b-2 ' >All Feedbacks  </h3>
        {contact.map((contact)=>(
            <div key={contact._id} className='flex flex-col bg-gray-200 p-5 m-5 rounded-2xl '> 
                <span>Name:<span className='ml-2'>{contact.name}</span></span>
                <span>Email:<span className='ml-2'><a className='text-blue-500 hover:text-blue-600 hover:opacity-40' href={`mailto:${contact.email}`}>{contact.email}</a></span></span>
                <span className='text-2xl text-gray-600 mb-1 mt-3'>Message:</span>
                <span className='text-wrap text-gray-500 '>{contact.description}</span>
                <span>Date Created: <span className='text-pink-600'>{new Date(contact.createdAt).toDateString()}</span></span>
                <button className='hover:opacity-40'  onClick={()=>onDelete(contact._id)}><FaTrash className='text-red-600'/></button>
            </div>
        ))}
    </div>
  )
}

export default ContactCard