import React, { useEffect, useState } from 'react';
import { Pubs } from '../constants/Pub';

interface PubsPro {
  pub: Pubs[];
}

const BannerPage: React.FC<PubsPro> = ({ pub }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pub.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [pub.length]);

  if (!pub || pub.length === 0) return null;

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded shadow-lg">
      {pub.map((p, index) => (
        <div
          key={p._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-pink-600 bg-opacity-60 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{p.name}</span>
              <span className="text-sm text-gray-200">${p.price}</span>
            </div>
            <span className="text-sm text-green-400 font-medium">Available</span>
          </div>
          <div className=" flex flex-col absolute top-5 bg-pink-600 ml-2 p-2 opacity-30 rounded">
            <h3 className='text-gray-400 text-2xl text-center mb-2'>Contacts Us </h3>
            <span className='text-white'>Tel: <span>+254 707 983256</span></span>
            <span className='text-white font-family'>Email: <a className='ml-2 text-gray-200 hover:border-b-2 hover:text-blue-700' href='mailto:ttelectronicsapril2025@gmail.com'>ttelectronicsapril2025@gmail.com</a></span>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {pub.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-red-600 scale-110' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerPage;
