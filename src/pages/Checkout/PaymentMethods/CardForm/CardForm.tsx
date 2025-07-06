import { Button } from '@mui/material';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || '');

const CardEl = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (card == null) return;

    const toastId = toast.loading('Processing payment...');
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (error) {
        console.log('stripe-error', error);
        toast.error('Something went wrong', { id: toastId });
      } else {
        console.log('PaymentMethod', paymentMethod);
        toast.success('Payment successful!', { id: toastId });
      }
    } catch (err) {
      if (
        err &&
        typeof err === 'object' &&
        'data' in err &&
        (err as any).data?.message
      ) {
        toast.error((err as any).data.message, { id: toastId });
      } else {
        toast.error('Something went wrong', { id: toastId });
      }
    }
  };
  return (
    // <Elements stripe={stripePromise}>
    <form onSubmit={handleSubmit}>
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
      <Button variant="outlined" type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
    // </Elements>
  );
};

const CardForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardEl />
    </Elements>
  );
};

export default CardForm;
