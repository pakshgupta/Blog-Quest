import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        requred: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password"))
            return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
    catch (error) {
        console.error(error);
    }
});
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
};
export const User = mongoose.model("User", userSchema);
