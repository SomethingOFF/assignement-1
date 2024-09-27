const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const fileRoutes = require("./routes/file-routes");
const error = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", userRoutes);
app.use("/api", fileRoutes);

app.use(error);
module.exports = app;
