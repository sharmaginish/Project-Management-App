const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");

const router = express.Router();



// REGISTER

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role
      } = req.body;

      // CHECK EXISTING USER

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      // HASH PASSWORD

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      // CREATE USER

      await User.create({

        name,

        email,

        password:
          hashedPassword,

        role,

      });

      res.status(201).json({
        message:
          "Signup successful",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });

    }

  }
);



// LOGIN

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // FIND USER

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(400).json({
          message:
            "User not found",
        });

      }

      // CHECK PASSWORD

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid credentials",
        });

      }

      // GENERATE TOKEN

      const token =
        jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

      // RESPONSE

      res.json({

        token,

        user: {

          _id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,

        }

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });

    }

  }
);



// PROFILE

router.get(
  "/profile",
  protect,

  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        ).select("-password");

      res.json(user);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message,
      });

    }

  }
);



// GET USERS

router.get(
  "/users",
  protect,

  async (req, res) => {

    try {

      const users =
        await User.find().select(
          "-password"
        );

      res.json(users);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message
      });

    }

  }
);



// DELETE USER

router.delete(
  "/users/:id",
  protect,

  async (req, res) => {

    try {

      // ADMIN ONLY

      if (
        req.user.role !== "Admin"
      ) {

        return res.status(403).json({
          message:
            "Admin only",
        });

      }

      // PREVENT SELF DELETE

      if (
        String(req.user._id) ===
        String(req.params.id)
      ) {

        return res.status(400).json({
          message:
            "You cannot delete yourself",
        });

      }

      // DELETE USER

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Member removed"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          err.message
      });

    }

  }
);

module.exports = router;