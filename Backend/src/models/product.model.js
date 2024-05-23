import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "wrong minimum price "],
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: [0, "wrong minimum discountPercentage"],
    max: [99, "wrong maximum discountPercentage"],
  },
  rating: {
    type: Number,
    required: true,
    min: [0, "wrong minimum rating "],
    max: [5, "wrong maximum rating"],
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "wrong minimum stock"],
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  deleted: {
    type: String,
    required: true,
    default: false,
  },
  images: [
    {
      type: String,
    },
  ],
});

export const Product = mongoose.model("Product", productSchema);
