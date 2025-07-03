import { Button } from "@mui/material";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Spinner from "components/Shared/Spinner";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "");

const CardEl = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();

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
    // <Elements stripe={stripePromise}>
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
      <Button variant="outlined" type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
    // </Elements>
  );
};

const CardForm = ({ totalPrice }: { totalPrice: number }) => {
  return totalPrice ? (
    <Elements stripe={stripePromise}>
      <CardEl totalPrice={totalPrice} />
    </Elements>
  ) : (
    <Spinner />
  );
};

export default CardForm;
