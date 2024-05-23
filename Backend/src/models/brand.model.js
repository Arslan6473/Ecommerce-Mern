import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export const Brand = mongoose.model("Brand", brandSchema);
