import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";

const stripePromise = loadStripe(
  "pk_test_51Jw3kbLVgc5NjgAR409h6hUSTdwq0as9kKvYXXSPiqob358eiEBtMgyg5cQGCVv90ObujNsQenPXuAZpU0Rg1kP900aqI4I95q"
);

const CardEl = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: user } = useSelector((state: AppState) => state.auth);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    (async () => {
      setClientSecret(
        await axios
          .post("http://localhost:8000/create-checkout-session", {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
            data: { price: totalPrice },
          })
          .then((res) => res.data)
      );
    })();
  }, [totalPrice]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("stripe-error", error);
    } else {
      console.log("PaymentMethod", paymentMethod);
    }
  };
  return (
    <Elements stripe={stripePromise}>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Elements>
  );
};

const CardForm = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <Elements stripe={stripePromise}>
      <CardEl totalPrice={totalPrice} />
    </Elements>
  );
};

export default CardForm;
