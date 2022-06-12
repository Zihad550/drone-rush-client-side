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
  const { data: user } = useSelector((state: AppState) => state.auth);
  const [clientSecret, setClientSecret] = useState("");
  console.log(clientSecret);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("here");

    if (!stripe || !elements) return;
    console.log("here2", elements);
    const card = elements.getElement(CardElement);
    console.log(card);
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    console.log("here 3");
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
