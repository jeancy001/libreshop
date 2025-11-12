import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  ShoppingCart,
  Star,
  BadgePercent,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { API_URL } from "../constants/API_URL";
import { Product } from "../constants/Product";
import { addToCart } from "../features/redux/CartSlice";

const SingleProduct: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const notify = () => toast.success("Added to Cart");

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    notify();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/byId/${id}`);
        const fetchedProduct: Product = res.data.product;
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.imageUrl[0] || null);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={selectedImage ?? product.imageUrl[0]}
            alt="Selected product"
            className="w-full h-72 object-cover rounded-lg shadow mb-4"
          />
          <div className="flex gap-2 overflow-x-auto">
            {product.imageUrl.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${product.name}-${idx}`}
                onClick={() => setSelectedImage(url)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  selectedImage === url
                    ? "border-pink-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Rating: {product.rating} / 5</span>
              </p>
              <p className="flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-green-600" />
                <span>Discount: {product.discountPercentage}%</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Delivery: {product.deliveryOptions.join(", ")}</span>
              </p>
              <p className="flex items-center gap-2">
                {product.status === "available" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span>Status: {product.status}</span>
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-bold text-pink-600 line-through">
              ${product.price.toFixed(2)}
            </p>
            <span>With Discount:</span>
            <p className="text-2xl font-bold text-pink-600">
              ${product.priceAfterDiscount.toFixed(2)}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SingleProduct;
