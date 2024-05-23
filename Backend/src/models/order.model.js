import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      type: Schema.Types.Mixed,
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  selectedAddress: {
    type: Schema.Types.Mixed,
    required: true,
  },
  selectedPaymentMethod: {
    type: String,
    required: true,
  },
});

export const Order = mongoose.model("Order", orderSchema);
