const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (
  req,
  res,
  next
) => {

  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

      // VERIFY TOKEN
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // SAVE FULL USER
      req.user._id =
        await User.findById(
          decoded.id
        ).select("-password");

      if (!req.user._id) {

        return res.status(401).json({
          message:
            "User not found",
        });
      }

      next();

    } else {

      return res.status(401).json({
        message:
          "No token provided",
      });
    }

  } catch (err) {

    console.log(err);

    return res.status(401).json({
      message:
        "Not authorized",
    });
  }
};

module.exports = protect;