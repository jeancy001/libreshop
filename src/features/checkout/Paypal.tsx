import { useEffect, useRef } from "react";


interface ProductsDetails{

    value:string,
    description:string
}
declare global {
  interface Window {
    paypal: any;
  }
}

function Paypal({value, description}:ProductsDetails) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal
      .Buttons({
        createOrder: (data:unknown, actions: any) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description:description,
                amount: {
                  currency_code: "USD",
                  value:value,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          console.log("Successfully ordered");
          console.log(order);
        },

        onError: (err: any) => {
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  );
}

export default Paypal;
