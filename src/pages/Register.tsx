import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Register:React.FC=()=>{
    const[username, setUsername] = useState<string>("")
    const[email, setEmail] = useState<string>("")
    const[tel, setTel] = useState("")
    const[password, setPassword] = useState<string>("")
    const[success, setSuccess] = useState<string>("")
    const[error, setError] = useState<string>("")
    const[loading, setLoading] = useState<boolean>(false)
    const[showPassword, setShowPassword] = useState<boolean>(false)

    const{register}=useAuth()
    const navigate = useNavigate()
  const handleSubmit= async(e:React.FormEvent)=>{
     e.preventDefault();
     try {
        setLoading(true)
        if(!username ||!email ||!tel ||!password){
            return setError("All  fields are required.")
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(tel)) {
          return setError("Phone number must be exactly 10 digits.");
        }
        await register(username,email,tel, password)
         setSuccess("Registered Successfully! ")
         setLoading(false)
         setUsername(" ")
         setEmail(" ")
         setPassword(" ")
         navigate("/")

     } catch (error:unknown) {
        
        if (typeof error === 'object' && error !== null && 'response' in error) {
            const err = error as { response?: { data?: { message?: string } } };
            setError(err.response?.data?.message || "An unexpected error occurred");
          } else {
            setError("An unexpected error occurred");
       }
     }
     setLoading(false)
  }
  return (
    <div className='flex flex-col items-center between mt-2 md:flex-row'>
      <div className="flex flex-col">
         <h2 className='text-center text-pink-600 font-bold'>TTElectronics</h2> 
         <span className='text-gray-400 text-wrap md:text-wrap text-center'>
        Is a global provider of engineered 
        electronics that design and manufacture 
        advanced electronic components and custom solutions for applications in industrial.
        </span>
        <img 
        className="w-full h-[60vh] opacity-80 mt-2 object-cover  shadow-md" 
        src="/electronics.jpg" 
        alt="electronics" 
        />

           </div>

      <div className="flex flex-col  ml-auto items-center ">
      <h2 className=' absolute  text-center text-pink-600 font-bold mb-5'>Register</h2>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-10 md:w-[90%] rounded-lg ">
      {error && (
        <span className="block text-center text-2xl mb-2 p-2 text-red-600">
            {error}
        </span>
        )}
        {success && (
        <span className="block text-center text-2xl mb-2 p-2 text-green-600">
            {success}
        </span>
        )}
      <input type='text'value={username} onChange={(e)=>setUsername(e.target.value)} className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Type  your  Username' />
      <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Type your  Email (example.com)' />
      
      <input type='text' value={tel} onChange={(e)=>setTel(e.target.value)} className='w-full p-3 pr-16 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Type your  Tel (0743303***)' />
      <div className="relative w-full mt-4">
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className='w-full p-3 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
    placeholder='Type your Password'
  />
  <button
    type="button"
    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sm text-blue-500 hover:underline"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? 'Hide' : 'Show'}
  </button>
</div>
       
      <button className="text-pink-600 font-bold border border-1 border-pink-600  w-full mt-4 p-3 text-center rounded duration-300 ease-in hover:bg-pink-600 hover:text-white" type='submit'>{loading?"Loading...":"Register"}</button>
         <div className="flex flex-col mt-3 items-center justify-center">
            <span className='text-gray-400 '>Already  have an account ?</span>
            <a className='border border-1 p-2 w-40 text-center border-blue-600 rounded text-blue-600 hover:bg-blue-600 hover:text-white font-bold duration-300 ease-in mt-2' href='/login' >Login</a>
         </div>
      </form>

      </div>

  
    </div>
  )
}

export default Register