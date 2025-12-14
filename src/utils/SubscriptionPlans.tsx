import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Paypal from "../features/checkout/Paypal";

const plans = [
  { type: "Free", price: 3.5, description: "Unlimited access for 3.5 days" },
  { type: "Standard", price: 9.5, description: "Full access for 1 month" },
  { type: "Premium", price: 19.5, description: "Full access + premium features for 1 month" },
];

const SubscriptionPlans: React.FC = () => {
  const { subscription, createOrRenewSubscription, renewSubscription } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);

  const handleSubscribe = async (planType: string) => {
    setSelectedPlan(planType);
    setCheckoutPlan(planType); // Show PayPal button for this plan
  };

  const handlePaymentSuccess = async (planType: string) => {
    setLoading(true);
    setMessage(null);
    try {
      let resMessage = "";
      if (!subscription || subscription.planType !== planType) {
        resMessage = await createOrRenewSubscription(planType) || "Subscribed successfully!";
      } else {
        resMessage = await renewSubscription(planType) || "Subscription renewed successfully!";
      }
      setMessage({ type: "success", text: resMessage });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
      setCheckoutPlan(null); // hide PayPal button after payment
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Choose Your Subscription Plan</h2>

      {message && (
        <div
          className={`mb-6 p-3 rounded text-center font-medium ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isActive = subscription?.planType === plan.type && subscription.isActive;
          const isSelected = selectedPlan === plan.type;

          return (
            <div
              key={plan.type}
              className={`
                border rounded-xl p-6 flex flex-col justify-between shadow-md transform transition-all
                hover:scale-105 hover:shadow-lg cursor-pointer
                ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
                ${isSelected ? "ring-2 ring-blue-400" : ""}
              `}
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">{plan.type}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <p className="text-xl font-semibold mb-4">
                  {checkoutPlan === plan.type ? (
                    <Paypal
                      value={plan.price.toString()}
                      description={`Subscription - ${plan.type}`}
                      onSuccess={() => handlePaymentSuccess(plan.type)}
                    />
                  ) : (
                    <span onClick={() => handleSubscribe(plan.type)}>${plan.price}</span>
                  )}
                </p>
              </div>

              <button
                disabled={loading}
                onClick={() => handleSubscribe(plan.type)}
                className={`
                  py-3 px-5 rounded-lg font-semibold text-white transition-colors
                  ${isActive ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {loading && isSelected && (
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                )}
                {isActive ? "Renew" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
