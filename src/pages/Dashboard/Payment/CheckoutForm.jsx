import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaLock } from 'react-icons/fa';

const CheckoutForm = ({ booking }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { totalPrice, _id, ticketId, ticketTitle, bookingQuantity, vendorEmail } = booking;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { amount: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    // Create Payment Method
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.displayName || 'anonymous',
      },
    });

    if (paymentError) {
      setError(paymentError.message);
      setProcessing(false);
      return;
    } else {
      setError('');
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        // Save Payment Info to Database
        const payment = {
          userEmail: user.email,
          vendorEmail: vendorEmail,
          transactionId: paymentIntent.id,
          totalPrice,
          date: new Date(),
          bookingId: _id,
          ticketId: ticketId,
          ticketTitle: ticketTitle,
          bookingQuantity: bookingQuantity,
          amount: totalPrice, // for stats
          status: 'paid'
        };

        const res = await axiosSecure.post('/payments', payment);
        
        if (res.data?.insertedId) {
          toast.success(`Payment Successful! Transaction ID: ${paymentIntent.id}`);
          navigate('/dashboard/transaction-history');
        }
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>
            <FaLock /> Pay ৳{totalPrice}
          </>
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
        <FaLock className="text-[10px]" /> Payments are secure and encrypted
      </p>
    </form>
  );
};

export default CheckoutForm;