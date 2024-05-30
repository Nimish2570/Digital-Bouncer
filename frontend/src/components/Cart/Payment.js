import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import axios from "axios";
import "./payment.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice ),
  };

  const orderReal = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const checkoutHandler = async (e) => {
    e.preventDefault();
    
    try {
      const { data: { key } } = await axios.get(`/api/v1/getkey`);
      const { data: { order } } = await axios.post(`/api/v1/checkout`, { amount: paymentData.amount });

      var options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Nimish Chaturvedi",
        description: "Transaction",
        image: "https://tse1.mm.bing.net/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&pid=Api&rs=1&c=1&qlt=95&w=125&h=120",
        order_id: order.id,
        callback_url: `/api/v1/payment/verification`,
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        notes: {
          address: shippingInfo.address,
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(
              `/api/v1/payment/verification`,
              response
            );
            if (verificationResponse.data.success) {
              orderReal.paymentInfo = {
                id: response.razorpay_payment_id,
                status: "success",
              };

              dispatch(createOrder(orderReal));
              navigate("/success");
            } else {
              alert.error("Payment verification failed. Please try again.");
            }
          } catch (error) {
            console.error(error);
            alert.error("Payment verification failed. Please try again.");
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error(error);
      alert.error('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <Typography className="paymentTitle">
          PAY USING RAZORPAY <a href="https://razorpay.com/docs/payments/payments/test-card-details/" >DUMMY CARD </a>
        </Typography>
        <form className="paymentForm" onSubmit={checkoutHandler}>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
   
        
      </div>

    </Fragment>
  );
};

export default Payment;
