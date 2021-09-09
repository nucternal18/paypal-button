import { useEffect, useState } from 'react'
import Head from 'next/head'
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function Home() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('');
  const [orderID, setOrderID] = useState();
  const [billingDetails, setBillingDetails] = useState('');
console.log(orderID)
console.log(billingDetails)
  // const addPaypalScript = () => {
  //   if (typeof window !== undefined && window.paypal) {
  //     setScriptLoaded(true);
  //     return;
  //   }
  //   const script = document.createElement('script');
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.onload = () => setScriptLoaded(true);
  //   document.body.appendChild(script);
  // };

  // useEffect(() => {
  //   addPaypalScript();
  // }, []);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              // charge users $499 per order
              value: 499,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function (details) {
        const { payer } = details;
        setBillingDetails(payer);
        setSucceeded(true);
      })
      .catch((err) => setPaypalErrorMessage('Something went wrong.'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to paypal test</h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <PayPalButtons
              style={{
                color: 'blue',
                shape: 'pill',
                label: 'pay',
                tagline: false,
                layout: 'horizontal',
              }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
