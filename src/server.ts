import express from "express";
import dotenv from "dotenv";

import bodyParser from "body-parser";

import connectDB from "./config/db";
import router from "./routes/auth.route";
dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
