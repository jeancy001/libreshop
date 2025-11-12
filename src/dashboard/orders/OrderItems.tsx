import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard"
import { Order } from "../../constants/Order";
import { useAuth } from "../../context/AuthContext";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants/API_URL";
import { toast, ToastContainer } from "react-toastify";


const OrderItems: React.FC =()=>{
    const [orders,setOrders] =useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("")
    const {token} = useAuth()
 

    useEffect(()=>{
    const getOrders =async()=>{
        try {
            setLoading(true)
        const response = await axios.get(`${API_URL}/api/order/`,{
            headers:{
                Authorization:`Bearer ${token}`
            }})
            console.log(response.data.orders)
            setOrders(response.data.orders)
            setLoading(false)
        } catch (error:unknown) {
            const err = error as AxiosError<{message:string}>
            const message = err?.response?.data?.message
            setError(message)
            setLoading(false)
        }
    }
    getOrders()
    },[token])

    const handleDelete = async(id:string)=>{
        try {
          await axios.delete(`${API_URL}/api/order/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          setOrders(prev => prev.filter(order => order._id !== id))
          toast.success("Order deleted successfully!")
        } catch (error) {
          const  err = error as  AxiosError<{message:string}>
          toast.error(err?.response?.data?.message)
        }
    }

if (loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

    if(error)return <span className="text-red-500 text-center">{error}</span>
    return(
       <div>
         {orders.length >0?(
           <OrderCard  onDelete={handleDelete} order={orders}/>
         ):(
          <div className="mb-10">
            <span className="text-red-600 text-2xl font-bold" >No  Order found </span>
          </div>
         )}
         <ToastContainer/>
       </div>
    )
}

export default OrderItems