import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";

const createCategory = asyncHandler(async (req, res) => {
  const { value, label } = req.body;

  if (!value || !label) {
    throw new ApiError(400, "Both label and value are required");
  }

  const createdCategory = await Category.create({ value, label });

  if (!createdCategory) {
    throw new ApiError(500, "Something went wrong while creating the category");
  }

  return res.status(201).json(createdCategory);
});

const fetchAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  return res.status(200).json(categories);
});

export { createCategory, fetchAllCategories };