// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


// ROUTES
const authRoutes = require(
  "./routes/authRoutes"
);

const projectRoutes = require(
  "./routes/projectRoutes"
);

const taskRoutes = require(
  "./routes/taskRoutes"
);


// API
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


// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB Connected")
  );


// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}`
  )
);