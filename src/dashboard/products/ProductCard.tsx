import React from 'react'
import { Product } from '../../constants/Product'

interface ProductCardProps {
  products: Product[]
  onDelete: (id: string) => void
  onUpdate: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ products, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 text-left table-auto shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 border text-center">
                <img 
                  src={product.imageUrl[0]} 
                  alt={product.name} 
                  className="w-24 h-24 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2 border font-medium">{product.name}</td>
              <td className="px-4 py-2 border">{product.description}</td>
              <td className="px-4 py-2 border text-green-600 font-semibold">
                ${product.price}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => onUpdate(product._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductCard
