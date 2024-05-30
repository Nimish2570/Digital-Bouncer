const catchAsyncError = require('../middleware/catchAsyncError');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});



// Process payments   =>   /api/v1/payment/process
exports.checkout = catchAsyncError(async (req, res, next) => {
  // Payment options
  const options = {
    amount: Number(req.body.amount * 100),  
    currency: "INR",
  };

  try {
    // Create an order using the payment gateway instance
    const order = await instance.orders.create(options);
    

    // Respond with the created order details
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    // If there's an error, pass it to the error handling middleware
    next(error);
  }
});

exports.paymentVerification = catchAsyncError(async (req, res, next) => {

  const {razorpay_order_id,razorpay_payment_id, razorpay_signature} =req.body; 

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  
  var expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic) {
      return next(new ErrorHandler("Payment verification failed", 400));
    }
    if(isAuthentic){
      console.log("Payment verified")
    }

  res.status(200).json({
    success: true,
    message: "Payment verified",
  });

});
