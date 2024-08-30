import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";

import connectDB from "./config/db";
import AuthRouter from "./routes/auth.route";
import JobseekerRouter from "./routes/jobseeker.route";
import EmployerRouter from "./routes/employer.route";
import UniversityRouter from "./routes/university.route";

dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", AuthRouter);
app.use("/api/v1/jobseeker", JobseekerRouter);
app.use("/api/v1/employer", EmployerRouter);
app.use("/api/v1/moderator", UniversityRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
