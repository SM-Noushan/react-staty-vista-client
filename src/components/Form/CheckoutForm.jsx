import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import "./CheckoutForm.css";

const CheckoutForm = ({ bookingInfo, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  //   get client secret
  const fetchClientSecret = async () => {
    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: bookingInfo?.price,
    });
    return data;
  };

  //update booked status
  const { mutateAsync: statusMutateAsync } = useMutation({
    mutationFn: async () => {
      const { data } = axiosSecure.patch(`/room/status/${bookingInfo?.roomId}`, {
        status: true,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Reservation successful");
      navigate("/dashboard/my-bookings");
    },
    onError: () => {
      toast.error("Failed! Try again");
    },
  });
  //post roomData to server
  const { mutateAsync: bookingMutateAsync } = useMutation({
    mutationFn: async (bookingData) => {
      const { data } = axiosSecure.post("/booking", bookingData);
      return data;
    },
    onSuccess: async () => {
      await statusMutateAsync();
    },
    onError: () => {
      toast.error("Failed! Try again");
    },
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (bookingInfo?.price > 1) {
      fetchClientSecret().then(({ clientSecret }) =>
        setClientSecret(clientSecret)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingInfo?.price]);

  const handleSubmit = async (event) => {
    try {
      // Block native form submission.
      event.preventDefault();
      setProcessing(true);

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      // Use your card Element with other Stripe.js APIs
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        //   console.log("[error]", error);
        return toast.error(error.message);
      }
      // else {
      //   console.log("[PaymentMethod]", paymentMethod);
      // }

      // confirm payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: bookingInfo.guest.name || "Anonymous",
              email: bookingInfo.guest.email || "Anonymous",
            },
          },
        });
      if (confirmError) return toast.error(confirmError.message);
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          ...bookingInfo,
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        await bookingMutateAsync(paymentInfo);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
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
      <div className="flex mt-2 justify-around">
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
        >
          {processing ? (
            <ImSpinner9 className="animate-spin m-auto" size={24} />
          ) : (
            `Pay ${bookingInfo?.price}`
          )}
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  closeModal: PropTypes.func,
  bookingInfo: PropTypes.object,
};

export default CheckoutForm;
