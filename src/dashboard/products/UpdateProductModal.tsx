import React, { useState } from 'react'
import axios from 'axios'
import { Product } from '../../constants/Product'
import { API_URL } from '../../constants/API_URL'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/AuthContext'


interface UpdateProductModalProps {
  product: Product
  onClose: () => void
  onSuccess: () => void

}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ product, onClose, onSuccess}) => {
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState<number | undefined>(product.price)
  const [discountPercentage, setDiscountPercentage] = useState<number | undefined>(product.discountPercentage)
  const [category, setCategory] = useState(product.category)
  const [brand, setBrand] = useState(product.brand)
  const [stock, setStock] = useState<number | undefined>(product.stock)
  const [deliveryOption, setDeliveryOption] = useState<string[]>(product.deliveryOptions || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previews, setPreviews] = useState<string[]>(product.imageUrl || [])
  const [images, setImages] = useState<File[]>([])

  const {token}= useAuth()

  const deliveryOptions = ["Standard", "Express", "Same Day"]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)
      setImages(fileArray)
      setPreviews(fileArray.map(file => URL.createObjectURL(file)))
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!name || !description || !price || !discountPercentage || !category || !brand || !stock || deliveryOption.length === 0) {
        setError("All fields are required.")
        setLoading(false)
        return
      }

      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price.toString())
      formData.append('discountPercentage', discountPercentage.toString())
      formData.append('category', category)
      formData.append('brand', brand)
      formData.append('stock', stock.toString())

      deliveryOption.forEach(option => {
        formData.append('deliveryOptions', option)
      })

      if (images.length > 0) {
        images.forEach((image) => formData.append('imageUrl', image))
      }

      await axios.put(`${API_URL}/api/product/update/${product._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Product updated successfully')
      onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      setError('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />

          <input type="file" multiple onChange={handleImageChange} className="w-full p-2 border rounded" />
          <div className="flex gap-2 flex-wrap">
            {previews.map((src, idx) => (
              <img key={idx} src={src} className="h-20 w-20 object-cover rounded border" alt="preview" />
            ))}
          </div>

          <input type="number" value={price || ''} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" className="w-full p-2 border rounded" />
          <input type="number" value={discountPercentage || ''} onChange={(e) => setDiscountPercentage(Number(e.target.value))} placeholder="Discount %" className="w-full p-2 border rounded" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full p-2 border rounded" />
          <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="w-full p-2 border rounded" />
          <input type="number" value={stock || ''} onChange={(e) => setStock(Number(e.target.value))} placeholder="Stock" className="w-full p-2 border rounded" />

          <select
            multiple
            value={deliveryOption}
            onChange={(e) =>
              setDeliveryOption(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            className="w-full p-2 border rounded"
          >
            {deliveryOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default UpdateProductModal
