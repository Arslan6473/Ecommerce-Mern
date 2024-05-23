import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user data from frontend
  const { email, password, confirmPassword, fullName } = req.body;

  // Validate not empty
  if ([email, password, fullName, confirmPassword].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate password and confirm password
  if (password !== confirmPassword)
    throw new ApiError(400, "Password and confirm password do not match");

  // Validate email
  if (!email.includes("@")) throw new ApiError(400, "Email requires @ symbol");

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ApiError(409, "User with the email or username already exists");

  // Create user object - create entry in db
  const user = await User.create({
    fullName,
    email,
    password: password,
  });

  const createdUser = await User.findById(user.id).select(
    "-password -refreshToken -createdAt -updatedAt -addresses -role"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  // Return response
  return res.status(201).json(createdUser);
});

const loginUser = asyncHandler(async (req, res) => {
  // Get user data from frontend
  const { email, password } = req.body;

  if (!(email && password))
    throw new ApiError(400, "Email and password are required");

  // Check password
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");
  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) throw new ApiError(401, "Invalid user credentials");

  // Generate access token and refresh token
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -createdAt -updatedAt -addresses -role"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  // Send cookie response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(loggedInUser);
});

const updateUser = asyncHandler(async (req, res) => {
  const { fullName, email, addresses } = req.body;

  if (!(email || fullName || addresses))
    throw new ApiError(400, "At least one field is required");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { email, fullName, addresses },
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(user);
});


const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById( req.user?._id).select("-password -refreshToken");

  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(user);
});

const signoutUser = asyncHandler(async (req, res) => {
  console.log(req.user?._id)
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "Signed out successfully" });
});

export {
  registerUser,
  loginUser,
  updateUser,
  getCurrentUser,
  signoutUser,
};
