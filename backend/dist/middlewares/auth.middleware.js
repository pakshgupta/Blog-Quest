import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const validateJWT = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Barear ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
        throw new ApiError(400, "token not found");
    }
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }
    // Type Assertion dynamically addd user in Request so typescript do nto give error
    req.user = user;
    next();
});
