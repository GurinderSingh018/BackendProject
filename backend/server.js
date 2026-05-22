import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// connect database & cloudinary
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

// allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://backend-project-six-pi.vercel.app" // deployed frontend
];

// cors configuration
app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin
      // (like mobile apps or postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// start server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});