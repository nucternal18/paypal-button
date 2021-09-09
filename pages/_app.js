import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {

  return (
    <PayPalScriptProvider
      options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <Component {...pageProps} />
    </PayPalScriptProvider>
  );
}

export default MyApp;
