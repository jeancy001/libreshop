import React, { useEffect, useState } from "react";
import { Pubs } from "../../constants/Pub";
import PubCard from "./PubCard";
import axios from "axios";
import { API_URL } from "../../constants/API_URL";
import { useAuth } from "../../context/AuthContext";
import {ToastContainer, toast } from "react-toastify";

const PubsItems:React.FC=()=>{
    const [pubs, setPubs]= useState<Pubs[]>([])
    const {token} = useAuth()
 
    useEffect(()=>{
    const getAllPub = async()=>{
        try {
        const response = await axios.get(`${API_URL}/api/pub/`)
        console.log(response.data.pub)
        setPubs(response.data.pub)
        } catch (error) {
            console.log(error)
        }
    }
    getAllPub()

    },[])


    const handleDelete = async(id:string)=>{
        try {
            await axios.delete(`${API_URL}/api/pub/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
          setPubs(prev => prev.filter(pub => pub._id !== id))
          toast.success("Pub  deleted successfully!")
        } catch (error) {
          toast.error("Error  occured!")
        console.log(error)
            
        }
    }
    return (
        <div>
        <PubCard onDelete={handleDelete} pub={pubs}/>
        <ToastContainer/>
        </div>
    )
}

export default PubsItems