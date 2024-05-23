import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/order.model.js";

const createOrder = asyncHandler(async (req, res) => {
  // Get order data from frontend
  const {
    products,
    user,
    totalAmount,
    totalItems,
    status,
    selectedAddress,
    selectedPaymentMethod,
  } = req.body;

  // Validate if any field is empty
  if (
    [
      products,
      user,
      totalAmount,
      totalItems,
      status,
      selectedAddress,
      selectedPaymentMethod,
    ].some((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Create order
  const createdOrder = await Order.create({
    products,
    user,
    totalAmount,
    totalItems,
    status,
    selectedAddress,
    selectedPaymentMethod,
  });

  if (!createdOrder) {
    throw new ApiError(500, "Something went wrong while creating the order");
  }

  // Send response
  return res.status(201).json(createdOrder);
});

const updateOrder = asyncHandler(async (req, res) => {
  // Get order data from frontend
  const {
    products,
    user,
    totalAmount,
    totalItems,
    status,
    selectedAddress,
    selectedPaymentMethod,
  } = req.body;

  // Validate if all fields are empty
  if (
    [products, user, totalAmount, totalItems, status, selectedAddress, selectedPaymentMethod].every((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  // Update order in db
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        products,
        user,
        totalAmount,
        totalItems,
        status,
        selectedAddress,
        selectedPaymentMethod,
      },
    },
    { new: true }
  );

  // Check if order not found
  if (!updatedOrder) {
    throw new ApiError(404, "Order not found");
  }

  return res.status(200).json(updatedOrder);
});

const fetchFilteredOrders = asyncHandler(async (req, res) => {
  let query = Order.find({});
  let totalOrders = Order.find({});

  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  let orders = await query.populate("user");

  if (!orders) {
    throw new ApiError(500, "Something went wrong while fetching orders");
  }

  const totalItems = await totalOrders.countDocuments();

  return res.status(200).json({ totalItems, orders });
});

const fetchUserOrders = asyncHandler(async (req, res) => {
  const userId =  req.user?._id;

  const userOrders = await Order.find({ user: userId }).populate("user");

  if (!userOrders) {
    throw new ApiError(500, "Something went wrong while fetching user orders");
  }

  return res.status(200).json(userOrders);
});

export { createOrder, updateOrder, fetchFilteredOrders, fetchUserOrders };
