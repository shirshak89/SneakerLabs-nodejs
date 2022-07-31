require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// DB
const connectDB = require("./db/connect");

// error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routes import
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test", (req, res) => {
  res.json({ msg: "test success" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
port = process.env.PORT || 5000;

const start = () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
