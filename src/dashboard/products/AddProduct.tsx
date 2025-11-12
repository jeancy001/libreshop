import React, { useState } from 'react'
import { API_URL } from '../../constants/API_URL'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import {ToastContainer, toast } from 'react-toastify'

const AddProduct: React.FC = () => {
  const { token } = useAuth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState<number | undefined>()
  const [stock, setStock] = useState<number | undefined>()
  const [discountPercentage, setDiscountPercentage] = useState<number | undefined>()
  const [category, setCategory] = useState('')
  const [deliveryOption, setDeliveryOption] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>("")
  const deliveryOptions = ['Standard', 'Express', 'Pickup']

  // Image file handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const typedFiles = files as File[]
    setImages(typedFiles)

    const previews = typedFiles.map((file) => URL.createObjectURL(file))
    setPreviews(previews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
    if(!name ||!description||!price ||!discountPercentage ||!category ||!brand||!brand ||!stock ||!images)return setError("All  fields are required.")
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      if (price !== undefined) formData.append('price', price.toString())
      if (discountPercentage !== undefined) formData.append('discountPercentage', discountPercentage.toString())
      formData.append('category', category)
      formData.append('brand', brand)
      if (stock !== undefined) formData.append('stock', stock.toString())
      formData.append('deliveryOptions', deliveryOption)
      images.forEach((image) => formData.append('imageUrl', image))

      await axios.post(`${API_URL}/api/product/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
       setName("")
       setDescription(" ")
       setPrice(undefined)
       setBrand("")
       setCategory("")
       setDiscountPercentage(undefined)
       setImages([])
       setDeliveryOption("")
       setStock(undefined)
       setPreviews([])
       setLoading(false)
       setSuccess("Product added successfully")
       toast.success('Product added successfully')
    } catch (err) {
      console.error(err)
      setError('Error adding product')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Add New Product</h3>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full p-3 border rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="w-full p-3 border rounded"
        />

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 border rounded"
        />

        <div className="flex gap-3 flex-wrap">
          {previews.map((src, index) => (
            <img key={index} src={src} alt="preview" className="h-20 w-20 object-cover rounded border" />
          ))}
        </div>

        <input
          type="number"
          value={price || ''}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          value={discountPercentage || ''}
          onChange={(e) => setDiscountPercentage(Number(e.target.value))}
          placeholder="Discount Percentage"
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          className="w-full p-3 border rounded"
        />

        <input
          type="number"
          value={stock || ''}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Stock"
          className="w-full p-3 border rounded"
        />

        <div>
          <label htmlFor="deliveryOption" className="block font-medium mb-1">
            Delivery Option
          </label>
          <select
            id="deliveryOption"
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="">-- Choose an option --</option>
            {deliveryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          {loading?"Adding...":"Add Product"} 
        </button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddProduct
