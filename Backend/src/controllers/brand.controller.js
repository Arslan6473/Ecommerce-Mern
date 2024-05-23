import { asyncHandler } from "../utils/asyncHandler.js";
import { Brand } from "../models/brand.model.js";
import { ApiError } from "../utils/ApiError.js";

const createBrand = asyncHandler(async (req, res) => {
  const { value, label } = req.body;

  if (!value || !label) {
    throw new ApiError(400, "Both label and value are required");
  }

  const createdBrand = await Brand.create({ value, label });

  if (!createdBrand) {
    throw new ApiError(500, "Something went wrong while creating the brand");
  }

  return res.status(201).json(createdBrand);
});

const fetchAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({});

  return res.status(200).json(brands);
});

export { createBrand, fetchAllBrands };
