import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";

const createProduct = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const {
    title,
    description,
    price,
    discountPercentage,
    stock,
    brand,
    rating,
    category,
    thumbnail,
    images,
  } = req.body;

  // Validate if any field is empty
  if (
    [
      title,
      description,
      price,
      discountPercentage,
      stock,
      brand,
      category,
      thumbnail,
      images,
    ].some((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Create product
  const createdProduct = await Product.create({
    title,
    description,
    price,
    discountPercentage,
    stock,
    brand,
    rating,
    category,
    thumbnail,
    images,
  });

  if (!createdProduct) {
    throw new ApiError(500, "Something went wrong while creating the product");
  }

  // Send response
  return res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  // Get product data from frontend
  const {
    title,
    description,
    price,
    discountPercentage,
    stock,
    brand,
    rating,
    category,
    thumbnail,
    images,
    deleted,
  } = req.body;

  // Validate if all fields are empty
  if (
    [title, description, price, discountPercentage, stock, brand, rating, category, thumbnail, images, deleted].every((field) => field == null || field === "")
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  // Update product in db
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title,
        description,
        price,
        discountPercentage,
        stock,
        brand,
        rating,
        category,
        thumbnail,
        images,
        deleted,
      },
    },
    { new: true }
  );

  // Check if product not found
  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(updatedProduct);
});

const fetchSingleProduct = asyncHandler(async (req, res) => {
  // Fetch product from db
  const singleProduct = await Product.findById(req.params.id);

  // Check if product not found
  if (!singleProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(singleProduct);
});

const fetchFilteredProducts = asyncHandler(async (req, res) => {
  let condition = {};

  if (!req.query.admin) {
    condition = { deleted: { $ne: true } };
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({ [req.query._sort]: req.query._order });
  }
  if (req.query._page && req.query._per_page) {
    const pageSize = +req.query._per_page;
    const page = +req.query._page;
    const skip = pageSize * (page - 1);
    query = query.skip(skip).limit(pageSize);
  }

  const products = await query.exec();
  const items = await totalProductsQuery.countDocuments().exec();

  if (!products) {
    throw new ApiError(500, "Something went wrong while fetching products");
  }

  return res.status(200).json({ items, data: products });
});

export {
  createProduct,
  updateProduct,
  fetchFilteredProducts,
  fetchSingleProduct,
};
