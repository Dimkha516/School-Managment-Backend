// Dependances require:
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Using:
const app = express();

// .ENV VARIABLES:
const baseUrl = process.env.BACKEND_BASIC_URL;
const PORT = process.env.PORT;

// Middlewares:
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting:
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes.
  max: 100, // 100 requêtes par IP.
});
// app.use("/api", limiter);
app.use(`${baseUrl}`, limiter);

// ROUTES CALLING:
const authRouter = require("./src/routes/auth.routes");
const usersRouter = require("./src/routes/users.routes");

// ROUTES USE:
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);

// CLOSING LINE: RUN SERVER
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
