import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import mainRouter from "./router/mainRouter.js";
import b2bRouter from "./router/b2bRouter.js";

// Const declarations
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "http://localhost:3000",
          "http://localhost:8000",
          "http://localhost:5173",
          "https://facottryanalytics.vercel.app"
        ]
      : [
          "http://localhost:3000",
          "http://localhost:8000",
          "http://localhost:5173",
        ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

// MongoDB Connection
mongoose
  .connect(process.env.MONG_URI)
  .then(
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      if (process.env.NODE_ENV === "production") {
        console.log("Production Ready");
      } else {
        console.log(`Server: http://localhost:${PORT}`);
      }
    })
  )
  .catch((err) => {
    console.log(err);
  });

// Routes
app.get("/", (req, res) => {
  return res.send("Analytics Backend");
});

app.use("/api", mainRouter);
app.use('/analytics', b2bRouter);