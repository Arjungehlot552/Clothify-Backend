import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_C7FsGPVIDq3gIU",
  key_secret: "llzQBzJC19kRxanAe0gjRjOt",
});

// Create a new order
export const createOrder = async (req, res) => {
  const { amount, currency } = req.body;
//   console.log(amount, currency);
  const options = {
    amount,
    currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpayInstance.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Internal server error");
  }
};

// Fetch payment details
export const fetchPayment = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);

    if (!payment) {
      return res.status(500).json("Error fetching Razorpay payment");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json("Failed to fetch payment");
  }
};

// Verify payment
