import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { placeOrder, userOrders, updateOrderStatus, placeOrderRazorpay,verifyRazorpayPayment, allOrders} from '../controller/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
const orderRoutes = express.Router();
//for user
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.get("/userorders", isAuth, userOrders);
orderRoutes.post("/placeorderrazorpay", isAuth, placeOrderRazorpay);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpayPayment);
//for admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateOrderStatus);

export default orderRoutes;