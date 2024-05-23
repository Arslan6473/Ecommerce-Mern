import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchSingleProduct,
  fetchFilterProducts,
  fetchBrands,
  fetchCategories,
  createProduct,
  updateProduct,
} from "./productApi";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  selectedProduct: null,
  totalItems: 0,
};

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchAllproductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchSingleproductAsync = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id) => {
    const response = await fetchSingleProduct(id);
    return response.data;
  }
);

export const fetchFilterProductsAsync = createAsyncThunk(
  "product/fetchFilterProducts",
  async ({ filter, sort, pagination,admin }) => {
    const response = await fetchFilterProducts(filter, sort, pagination,admin);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    const response = await createProduct(productData);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (updatedProduct) => {
    const response = await updateProduct(updatedProduct);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproductsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllproductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "idle";
      })
      .addCase(fetchSingleproductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchSingleproductAsync.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.status = "idle";
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = "idle";
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        state.products[index] = action.payload;
        state.status = "idle";
      })
      .addCase(fetchFilterProductsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchFilterProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.totalItems = action.payload.items;
        state.status = "idle";
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = "idle";
      });
  },
});

export const {clearSelectedProduct} = productSlice.actions;
export const selectAllproducts = (state) => state.product.products;
export const selectSingleproduct = (state) => state.product.selectedProduct;
export const selectAllbrands = (state) => state.product.brands;
export const selectAllcategories = (state) => state.product.categories;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectProductsStatus = (state) => state.product.status;


export const productReducer = productSlice.reducer;
