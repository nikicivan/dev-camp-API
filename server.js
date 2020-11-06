import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bootcamps from "./routes/bootcamp.routes.js";
import courses from "./routes/courses.routes.js";
import auth from "./routes/auth.routes.js";
import users from "./routes/user.routes.js";
import reviews from "./routes/reviews.routes.js";
import morgan from "morgan";
// import connectDB from "./config/db.js";
import colors from "colors";
import errorHandler from "./middleware/error.js";
import fileupload from "express-fileupload";
import path from "path";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to the database
const mongodbUri =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.v6u90.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() =>
    console.log(
      "MongoDB Connected.".cyan.underline.bold,
    )
  )
  .catch((error) => console.log(error));

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev loging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Enable CORS
app.use(cors());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

// Prevent HTTP Param Polution
app.use(hpp());

// Set static folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("hello from express");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold,
  ),
);

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`.red.bold);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });
