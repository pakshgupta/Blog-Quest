import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError(500, "Someting went wrong while genrating access and refresh token");
    }
};
export const signupController = asyncHandler(async (req, res) => {
    const { name, email, password, gender, dob } = req.body;
    if ([name, email, password, gender, dob].some((field) => !field?.trim)) {
        throw new ApiError(400, "All feilds are required");
    }
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
        throw new ApiError(400, "Invalid date of birth format. Use YYYY-MM-DD.");
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User already exist! Plese signin");
    }
    const user = await User.create({
        name: name.toLowerCase(),
        email,
        password,
        gender,
        dob: dobDate,
    });
    if (!user) {
        throw new ApiError(500, "Internal server errro while creating the user");
    }
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User created successfully!"));
});
export const signinController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        throw new ApiError(400, "All feilds are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found or Invalid credentianls! Please signup");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password! please try again");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());
    const signedinUser = await User.findById(user._id).select("-password -refreshToken");
    if (!signedinUser) {
        throw new ApiError(500, "Internal server error while fetching user details");
    }
    const options = {
        httpOnly: true, // ✅ Prevents client-side access
        secure: process.env.NODE_ENV === "production", // ✅ Use secure cookies only in production
        sameSite: "lax",
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, signedinUser, "User signedin successfully"));
});
export const signoutController = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(409, "Unauhorized request");
    }
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        },
    }, {
        new: true,
    });
    const options = {
        httpOnly: true,
        secure: true,
    };
    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User signedout successfully!"));
});
