const mongoose = require("mongoose");
const app = require("./app");

// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/blog1", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));