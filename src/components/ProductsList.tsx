import React from 'react';
import { Product } from '../constants/Product';
import { useNavigate } from 'react-router-dom';
import { FaBoxes } from 'react-icons/fa';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <img
            src={product.imageUrl[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <span className="flex items-center gap-2 text-gray-700">
            <FaBoxes className="text-green-600" />
            Stock: <p className="text-sm text-green-600 font-medium">{product.stock}</p>
          </span>
            <p className="text-pink-600 font-bold text-lg mb-1 line-through">${product.price}</p>
            <div className="flex items-center">
            <span className='mr-5 font-bold  text-gray-400'>Discount: </span>
            <p className="font-bold text-green-600">${product.priceAfterDiscount.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500">Status:<span className='text-green-800 ml-2'>{product.status}</span></p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
            <button onClick={()=>navigate(`/product/${product._id}`)}  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
