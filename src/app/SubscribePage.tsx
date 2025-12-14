import React from "react";
import SubscriptionPlans from "../utils/SubscriptionPlans";
import { ShoppingCart, Cpu, Smartphone } from "lucide-react";

const SubscribePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Content Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Unlock Premium Access
          </h1>
          <p className="text-gray-700 text-lg mb-6 max-w-lg">
            Subscribe to gain exclusive access to our <strong>latest electronics, gadgets, and e-commerce deals</strong>. 
            Enjoy premium features, early product releases, and special discounts only for subscribers.
          </p>

          {/* Features with Icons */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3 justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              <span className="text-gray-700 font-medium">
                Shop the newest electronics with ease
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Cpu className="w-6 h-6 text-green-500" />
              <span className="text-gray-700 font-medium">
                Access exclusive gadget releases before anyone else
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Smartphone className="w-6 h-6 text-purple-500" />
              <span className="text-gray-700 font-medium">
                Enjoy mobile-friendly shopping with fast checkout
              </span>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="w-full">
            <SubscriptionPlans />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
