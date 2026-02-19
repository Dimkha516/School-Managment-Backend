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
const programsRouter = require("./src/routes/programs.routes");
const studentsRouter = require("./src/routes/students.routes");
const teachersController = require("./src/routes/teachers.routes");
const adminsController = require("./src/routes/admins.routes");
const coursesController = require("./src/routes/courses.routes");
const roomsController = require("./src/routes/rooms.routes");
const schedulesController = require("./src/routes/schedules.routes");
const paymentsController = require("./src/routes/payments.routes");
const notificationsController = require("./src/routes/notifications.routes");
const notificationsReadController = require("./src/routes/notificationsRead.routes");
const attendancesReadController = require("./src/routes/attendance.routes");
const assessmentsReadController = require("./src/routes/assessments.routes");
const gradesReadController = require("./src/routes/grades.routes");
const reportCardController = require("./src/routes/reportCards.routes");

// ROUTES USE:
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/programs`, programsRouter);
app.use(`${baseUrl}/students`, studentsRouter);
app.use(`${baseUrl}/teachers`, teachersController);
app.use(`${baseUrl}/admins`, adminsController);
app.use(`${baseUrl}/courses`, coursesController);
app.use(`${baseUrl}/rooms`, roomsController);
app.use(`${baseUrl}/schedules`, schedulesController);
app.use(`${baseUrl}/payments`, paymentsController);
app.use(`${baseUrl}/notifications`, notificationsController);
app.use(`${baseUrl}/notificationsRead`, notificationsReadController);
app.use(`${baseUrl}/attendances`, attendancesReadController);
app.use(`${baseUrl}/assessments`, assessmentsReadController);
app.use(`${baseUrl}/grades`, gradesReadController);
app.use(`${baseUrl}/reportCards`, reportCardController);

// CLOSING LINE: RUN SERVER
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
