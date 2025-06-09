const express = require("express");
const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
} = require("../controllers/blog.controller");
const { protect } = require("../middlewares/auth.middlewares");
const router = express.Router();

router.route("/").get(protect, getAllBlogs);
router.route("/getAll/:id").get(protect, getBlogById);
router.route("/create").post(protect, createBlog);
router.route("/update/:id").patch(protect, updateBlog);
router.route("/delete/:id").delete(protect, deleteBlog);

module.exports = router;
