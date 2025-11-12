import React, { FormEvent, useState } from 'react'
import {ToastContainer, toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../../constants/API_URL'
import { useAuth } from '../../context/AuthContext'

const AddPub: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const [price, setPrice] = useState<string>('') // use string to avoid uncontrolled input issue
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { token } = useAuth()

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handlePubs = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    setLoading(true)

    // Validate input
    if (!name || !image || !price) {
      toast.error('All fields are required.')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('imageUrl', image)
    formData.append('price', price)

    try {
      await axios.post(`${API_URL}/api/pub/create-pub`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Pub Created!')
      setName('')
      setImage(null)
      setPrice('')
      setPreview(null)
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>
      const message = err?.response?.data?.message || 'An unexpected error occurred.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-gray-400 font-bold">Add Pubs</h3>
      <form onSubmit={handlePubs} className="p-5 m-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded p-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type Product Name..."
        />
        <input
          onChange={handleUploadFile}
          className="w-full rounded p-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded p-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Type your price..."
        />
        {preview && (
          <div>
            <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded border" />
          </div>
        )}
        <button
          type="submit"
          className="w-full border p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded duration-300"
        >
          {loading ? 'Publishing...' : 'Create Pub'}
        </button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddPub
