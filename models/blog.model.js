const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: 'Anonymous',
        required: true,
    },
    category: {
        type: String,
        default: 'Uncategorized',
        enum: ['Uncategorized', 'Tech', 'Life', 'Entertainment'],
        required: true,
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;