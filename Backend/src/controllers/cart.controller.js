import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";

const createCartItem = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const { product, quantity, user } = req.body;

  // Validate any field is empty
  if (
    [product, quantity, user].some((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Create product
  const createdCartItem = await Cart.create({ product, quantity, user });

  if (!createdCartItem) {
    throw new ApiError(500, "Something went wrong while creating cart item");
  }

  const addedCartItem = await Cart.find({_id:createdCartItem._id}).populate(
    "product"
  );

  // Send response
  return res.status(201).json(addedCartItem);
});

const updateCartItem = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const { product, quantity, user } = req.body;

  // Validate if all fields are empty
  if (
    [product, quantity, user].every((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  // Update product in db
  const updatedCartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { $set: { quantity } },
    { new: true }
  );

  // Check if product not found
  if (!updatedCartItem) {
    throw new ApiError(404, "Cart item not found");
  }

  const updatedItem = await Cart.find({_id:updatedCartItem._id}).populate(
    "product"
  );

  return res.status(200).json(updatedItem);
});

const fetchAllCartItems = asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({ user: req.user?._id }).populate(
    "product"
  );

  if (!cartItems) {
    throw new ApiError(500, "Something went wrong while fetching cart items");
  }

  return res.status(200).json(cartItems);
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const deletedItem = await Cart.find({ _id: req.params.id }).populate(
    "product"
  );

  if (!deletedItem) {
    throw new ApiError(404, "Cart item not found");
  }

  await Cart.findByIdAndDelete(req.params.id);

  return res.status(200).json(deletedItem);
});

export { createCartItem, updateCartItem, fetchAllCartItems, deleteCartItem };
