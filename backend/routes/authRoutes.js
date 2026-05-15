const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Signup successful",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const user = await User.findOne({ email });

    console.log("USER:", user);

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("MATCH:", isMatch);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const protect = require("../middleware/authMiddleware");

router.get(
  "/profile",
  protect,

  async (req,res) => {

    try {

      const user = await User.findById(
        req.user.id
      ).select("-password");

      res.json(user);

    } catch(err){

      res.status(500).json({
        message:err.message
      });

    }

  }
);

    res.json({
  token,
  role:user.role,
  user:{
    id:user._id,
    name:user.name,
    email:user.email,
    role:user.role,
  }
});

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;