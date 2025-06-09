const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

exports.signUp = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const checkUser = await User.findOne({ email });

    if (checkUser) {
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({ username, email, password });

    const token = signToken(user._id);

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expiresIn: process.env.JWT_EXPIRE
    });
    res.status(201).json({
        statusCode: "success",
        message: "User created successfully",
        user
    });
})

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, "User does not exist");
    }

    if (user && await user.isPasswordCorrect(password)) {
        const token = signToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expiresIn: process.env.JWT_EXPIRE
        });
        return res.status(200).json({
            statusCode: "success",
            message: "User logged in successfully",
            user
        });
    }
}


exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
    });
    res.status(200).json({
        statusCode: "success",
        message: "User logged out successfully",
    });
})