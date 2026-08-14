import crypto from 'crypto'
import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from "razorpay";
const currency = "INR";

const getRazorpayInstance = () => {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
        console.error('Razorpay keys missing in environment: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET')
        throw new Error('Razorpay keys not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET')
    }
    return new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    })
}

export const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;
        const userId = req.userId;
        // basic validation for structured address
        if (!address || typeof address !== 'object') return res.status(400).json({ message: 'Invalid address' });
        const required = ['firstName','lastName','email','street','city','pincode','country','phone'];
        for (const key of required) {
            if (!address[key] || String(address[key]).trim() === '') return res.status(400).json({ message: `Missing address field: ${key}` });
        }

        if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Order items are required' });
        const missingItemField = items.find(item => !item.productId || !item.name || !item.quantity);
        if (missingItemField) return res.status(400).json({ message: 'Each order item must include productId, name, and quantity'});

        const orderData={
            items,
            amount,
            address,
            userId,
            paymentMethod: paymentMethod || "COD",
            payment: false,
            Date: Date.now(),
        }
        const newOrder = new Order(orderData);
        await newOrder.save();

            // ensure Razorpay keys are configured
            const keyId = process.env.RAZORPAY_KEY_ID
            const keySecret = process.env.RAZORPAY_KEY_SECRET
            if (!keyId || !keySecret) {
                console.error('Razorpay keys missing: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set')
                return res.status(500).json({ message: 'Razorpay keys not configured on server' })
            }
        await User.findByIdAndUpdate(userId, { cartData: {} })
        return res.status(200).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.log("placeOrder error", error);
        return res.status(500).json({ message: `placeOrder error ${error}` });
    } 
}


//for razorpay payment integration
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      items,
      amount,
      address,
      userId,
      paymentMethod: "Razorpay",
      payment: false,
      Date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: Math.round(amount * 100),
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
      notes: {
        orderId: newOrder._id.toString(),
      },
    };

    const payment = await getRazorpayInstance().orders.create(options);

    return res.status(200).json({
      message: "Order placed successfully",
      order: newOrder,
      payment,
            key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log("placeOrderRazorpay error", error);
    return res.status(500).json({
      message: `placeOrderRazorpay error ${error.message}`,
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderId) {
            return res.status(400).json({ message: 'Missing payment verification details' });
        }

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || process.env.RASORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Invalid payment signature' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.payment = true;
        order.status = 'processing';
        await order.save();
        await User.findByIdAndUpdate(order.userId, { cartData: {} });

        return res.status(200).json({ message: 'Payment verified successfully', order });
    } catch (error) {
        console.log('verifyRazorpayPayment error', error);
        return res.status(500).json({ message: `verifyRazorpayPayment error ${error}` });
    }
}
export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId }).sort({ Date: -1 });
        return res.status(200).json(orders);
    } catch (error) {
        console.log("userOrders error", error);
        return res.status(500).json({ message: `userOrders error ${error}` });
    }
}


//for admin

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ Date: -1 });
        return res.status(200).json(orders);
    }
    catch (error) {
        console.log("allOrders error", error);
        return res.status(500).json({ message: `allOrders error ${error}` });
    }
}


export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;               

        if (!orderId || !status) return res.status(400).json({ message: 'orderId and status are required' });

        const order = await Order.findById(orderId);    

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        await order.save();

        return res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.log("updateOrderStatus error", error);
        return res.status(500).json({ message: `updateOrderStatus error ${error}` });
    }       
}