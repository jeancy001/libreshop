import React, { useEffect, useState } from 'react'
import { Product } from '../../constants/Product'
import axios from 'axios'
import { API_URL } from '../../constants/API_URL'
import ProductCard from './ProductCard'
import { useAuth } from '../../context/AuthContext'
import UpdateProductModal from './UpdateProductModal'
import {ToastContainer, toast } from 'react-toastify'


const ProductItems: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/`)
        setProducts(response.data.products)
      } catch (error) {
        console.error(error)
      }
    }

    getProducts()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setProducts(prev => prev.filter(product => product._id !== id))
      toast.success("Product deleted successfully!")
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleUpdate = (id: string) => {
    const productToEdit = products.find(p => p._id === id)
    if (productToEdit) setSelectedProduct(productToEdit)
  }

  const handleModalClose = () => setSelectedProduct(null)

  const handleUpdateSuccess = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/product/`)
      setProducts(response.data.products)
    } catch (error) {
      console.error("Failed to refresh product list:", error)
    }
  }

  return (
    <div className="items-center justify-center">
      <ProductCard 
        products={products}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      {selectedProduct && (
        <UpdateProductModal 
          product={selectedProduct}
          onClose={handleModalClose}
          onSuccess={handleUpdateSuccess}
    
        />
      )}
      <ToastContainer/>
    </div>
  )
}

export default ProductItems
