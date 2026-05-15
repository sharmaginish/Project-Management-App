const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const app = express();



/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());



/* =========================================
   ROUTES
========================================= */

const authRoutes = require(
  "./routes/authRoutes"
);

const projectRoutes = require(
  "./routes/projectRoutes"
);

const taskRoutes = require(
  "./routes/taskRoutes"
);



/* =========================================
   API ROUTES
========================================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);



/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {

  res.send("API Running Successfully");

});



/* =========================================
   DATABASE
========================================= */

mongoose.set(
  "strictQuery",
  true
);

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(
      "MongoDB Error:"
    );

    console.log(err);

  });



/* =========================================
   SERVER
========================================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});



/* =========================================
   ERROR HANDLERS
========================================= */

process.on(
  "unhandledRejection",
  (err) => {

    console.log(
      "Unhandled Rejection:"
    );

    console.log(err);

  }
);

process.on(
  "uncaughtException",
  (err) => {

    console.log(
      "Uncaught Exception:"
    );

    console.log(err);

  }
);