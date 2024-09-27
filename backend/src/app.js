const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const fileRoutes = require("./routes/file-routes");
const error = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["*"];

const corsOptions = {
  origin: "http://localhost:5173", // Specify your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

app.use("/api", userRoutes);
app.use("/api", fileRoutes);

app.use(error);
module.exports = app;
