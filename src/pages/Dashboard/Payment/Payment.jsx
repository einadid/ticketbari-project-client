import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CheckoutForm from './CheckoutForm';
import SectionTitle from '../../../components/shared/SectionTitle';

// আপনার Stripe Publishable Key এখানে দিন (Environment Variable ব্যবহার করুন)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const booking = useLoaderData();
  const { ticketTitle, totalPrice } = booking;

  return (
    <>
      <Helmet>
        <title>Payment | TicketBari</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto py-12 px-4">
        <SectionTitle heading="Secure Payment" subHeading="Complete your booking" />

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="mb-8 text-center">
            <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-2">Payment for</h2>
            <h3 className="text-2xl font-bold text-primary mb-2">{ticketTitle}</h3>
            <p className="text-4xl font-bold text-gray-800 dark:text-white">৳{totalPrice}</p>
          </div>

          <div className="max-w-md mx-auto">
            <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking} />
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;