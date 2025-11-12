import React from "react";
import { Order } from "../../constants/Order";
import { FaBox, FaMoneyBillWave, FaTruck, FaMapMarkedAlt, FaCheckCircle, FaTrash } from "react-icons/fa";

interface OrderPros {
  order: Order[];
  onDelete:(id:string)=>void
}

const OrderCard: React.FC<OrderPros> = ({ order ,onDelete}) => {
  return (
    <div className="space-y-6">
      {order.map((order) => (
        <div key={order._id} className="p-4 rounded-2xl shadow-md bg-white space-y-4 border border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaTruck className="text-blue-500" />
              <span>Delivery: {order.deliveryOption}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
              <span>Total: ${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-purple-500" />
              <span>Status: {order.orderStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBox className="text-yellow-500" />
              <span>Payment: {order.paymentMethod}</span>
            </div>
          </div>
          <div className="flex flex-col">
         <span className="border-b-2 border-gray-300 text-2xl font-bold">Clients</span>
          <div className="text-sm text-gray-600">
            <strong>User:</strong> {order.user.username}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Tel:</strong> {order.user.tel}
            </div>
          <div className="text-sm text-gray-600">
            <strong>User:</strong> {order.user.email}
          </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {order.products.map((pro) => (
              <div key={pro._id} className="p-3 bg-gray-50 rounded-lg border">
                <div><strong>Name:</strong> {pro.product.name}</div>
                <div><strong>Brand:</strong> {pro.product.brand}</div>
                <div><strong>Price:</strong> ${pro.priceAtPurchase}</div>
                <div><strong>Qty:</strong> {pro.quantity}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 items-center text-sm text-gray-700">
            <FaMapMarkedAlt className="text-red-500" />
            <div>
              <div><strong>Address:</strong> {order.shippingAddress.addressLine1}</div>
              <div><strong>City:</strong> {order.shippingAddress.city}</div>
              <div><strong>Country:</strong> {order.shippingAddress.country}</div>
              <div><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</div>
            </div>
          </div>
          <button className="" onClick={()=>onDelete(order._id)}><FaTrash className="text-red-600"/></button>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
