import React from 'react'

const RedirectPage:React.FC=()=>{
  return (
    <div className='flex flex-col justify-center items-center mt-5' >
      <h2 className='text-green-800 text-2xl text-center border-b-2 mb-5'>Congrats !</h2>
      <div className="flex flex-col justify-center items-center">
        <p>
            Your  Password  has  been  reset successfully 
        </p>
        <span>Click below  to  redirect to the  </span>
        <a className="text-blue-600 hover:border-blue-600 hover:border-b-2 duration-300 ease-in" href="/login">Login.</a> 
          <div className="w-full border border-b-1 border-gray-400 mt-5 mb-2"></div>
        <div className="flex flex-col">
            <span className='text-center text-2xl text-gray-500'>Contact Us</span>
          <div className="flex flex-row ">
            Email: <a className='ml-3 text-blue-400 hover:border-blue-400 hover:border-b-2 duration-300 ease-in' href="mailto:trainingtech84@gmail.com">trainingtech83@gmail.com</a>
          </div>
       </div>
      </div>
    </div>
  )
}

export default RedirectPage