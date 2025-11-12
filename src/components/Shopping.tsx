import React, { useState, useEffect } from 'react';
import OrderItems from '../dashboard/orders/OrderItems';

const Shopping: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate data loading (you can replace this with real API logic)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-[50%] gap-10">
        <h3 className="text-red-800 font-bold text-2xl mt-4">Shopping</h3>
        <OrderItems />
      </div>
    </div>
  );
};

export default Shopping;
