import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store/store";
import { addToCart, decreaseQuantity, removeFromCart } from "../features/redux/CartSlice";
import { FaTrashAlt } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../constants/API_URL";
import { useAuth } from "../context/AuthContext";

// 🧾 Modal to handle Order Submission
const OrderFormModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    country: "",
    deliveryOption: "Express",
    paymentMethod: "Card"
  });

  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const {token} = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity
      })),
      shippingAddress: {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },
      deliveryOption: formData.deliveryOption,
      paymentMethod: formData.paymentMethod
    };

    try {
      const res = await axios.post(`${API_URL}/api/order/`, orderPayload, {
        headers: {
          Authorization:`Bearer ${token}`,
           "Content-Type": "application/json" }
      });

      console.log("Order success:", res.data);
      toast.success("✅ Order placed successfully!");
      onClose();
    } catch (err) {
      console.error("Order failed:", err);
      const error = err as AxiosError<{message:string}>
      const message = error?.response?.data?.message
      toast.error(message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Complete Your Order</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
          </select>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Card">Card</option>
            <option value="PayPal">PayPal</option>
            <option value="CashOnDelivery">Cash on Delivery</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 text-white w-full py-2 rounded hover:bg-pink-700"
          >
            {loading ? "Placing Order..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

// 🛒 Main Cart Page
const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.priceAfterDiscount * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="grid grid-cols-1 gap-6">
        {cartItems.map((cart) => (
          <div
            key={cart._id}
            className="flex gap-6 p-4 border rounded-xl shadow-md hover:shadow-lg transition duration-200 relative"
          >
            <img
              src={cart.imageUrl[0]}
              alt={cart.name}
              className="w-40 h-40 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <h3 className="text-lg font-semibold">{cart.name}</h3>
                <p className="text-sm text-gray-500">
                  {cart.brand} • {cart.category}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery: {cart.deliveryOptions}
                </p>
                <p className="text-sm text-gray-700 mt-2">{cart.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-pink-600 font-bold text-lg">
                  ${cart.price * cart.quantity}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(cart._id))}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xl font-bold hover:bg-gray-300"
                  >
                    –
                  </button>
                  <span className="font-medium text-lg">{cart.quantity}</span>
                  <button
                    onClick={() => dispatch(addToCart(cart))}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xl font-bold hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(cart._id))}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm"
            >
              <FaTrashAlt className="text-2xl" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end items-center">
        <div className="text-lg font-semibold">
          <span className="text-gray-400">With Discount:</span>
          Total: <span className="text-pink-600 text-2xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => setShowModal(true)}
          className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
        >
          ${totalPrice.toFixed(2)} Order Now
        </button>
      </div>

      {showModal && <OrderFormModal onClose={() => setShowModal(false)} />}
      <ToastContainer/>
    </div>
  );
};

export default CartPage;
