const Blog = require("../models/blog.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

//get all blogs
exports.getAllBlogs = asyncHandler(async (req, res, next) => {

    const blogs = await Blog.find()
        .populate("author", "username") // ✅ populate author means populate author from user model
        .sort({ createdAt: -1 })
        .lean();

    res.status(200).json({
        statusCode: "success",
        message: "Blogs fetched successfully",
        results: blogs.length,
        blogs,
    });
});

exports.getBlogById = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // ✅ Correct destructuring

    const blog = await Blog.findById(id).populate("author", "username").lean(); // ✅ populate author

    if (!blog) {
        return next(new ApiError(404, "Blog not found"));
    }

    res.status(200).json({
        statusCode: "success",
        message: "Blog fetched successfully",
        blog,
    });
});


exports.createBlog = asyncHandler(async (req, res, next) => {
    // Set author from authenticated user
    req.body.author = req.user?._id || "anonymous";// ✅ Set author from authenticated user
    const newBlog = await Blog.create(req.body);

    if (!newBlog) {
        return next(new ApiError(500, "Failed to create blog !"));
    }

    res.status(201).json({
        statusCode: "success",
        message: "blog created successfully",
    });
});


exports.updateBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return next(new ApiError(404, "Blog not found"));
    }
    if (blog.author.toString() !== req.user._id.toString()) {
        return next(new ApiError(403, "You are not authorized to update this blog"));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedBlog) {
        return next(new ApiError(500, "Failed to update blog!"));
    }
    res.status(200).json({
        statusCode: "success",
        message: "blog updated successfully",
        updatedBlog,
    });
});

exports.deleteBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return next(new ApiError(404, "Blog not found"));
    }
    if (blog.author.toString() !== req.user._id.toString()) {
        return next(new ApiError(403, "You are not authorized to delete this blog"));
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
        return next(new ApiError(500, "Failed to delete blog!"));
    }
    res.status(200).json({
        statusCode: "success",
        message: "blog deleted successfully",
        deletedBlog,
    });
});