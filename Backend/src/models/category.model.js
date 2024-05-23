import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);
