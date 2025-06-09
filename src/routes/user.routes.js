const express = require("express");
const { signUp, login, logout } = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.get("/test", protect, (req, res) => {
  res.status(200).json({ message: "You are logged in", user: req.user });
});

module.exports = router;
