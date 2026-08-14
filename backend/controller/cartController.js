import mongoose from "mongoose";
import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({ message: "productId is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        const qty = Number(quantity) > 0 ? Number(quantity) : 1;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!Array.isArray(user.cartData)) {
            user.cartData = [];
        }

        const normalizedProductId = new mongoose.Types.ObjectId(productId);
        user.cartData = user.cartData.filter((item) => item && item.productId);

        const existingItem = user.cartData.find(
            (item) => item.productId.toString() === normalizedProductId.toString()
        );

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            user.cartData.push({ productId: normalizedProductId, quantity: qty });
        }

        await user.save();
        return res.status(200).json({
            message: "Product added to cart successfully",
            cartData: user.cartData
        });
    } catch (error) {
        console.log("addToCart error", error);
        return res.status(500).json({ message: `addToCart error ${error}` });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate("cartData.productId");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user.cartData);
    } catch (error) {
        console.log("getCart error", error);
        return res.status(500).json({ message: `getCart error ${error}` });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.userId;

        if (!productId) {
            return res.status(400).json({ message: "productId is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const itemIndex = user.cartData.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        const qtyToRemove = Number(quantity) > 0 ? Number(quantity) : 1;
        user.cartData[itemIndex].quantity -= qtyToRemove;

        if (user.cartData[itemIndex].quantity <= 0) {
            user.cartData.splice(itemIndex, 1);
        }

        await user.save();
        return res.status(200).json({ message: "Product removed from cart", cartData: user.cartData });
    } catch (error) {
        console.log("removeFromCart error", error);
        return res.status(500).json({ message: `removeFromCart error ${error}` });
    }
}