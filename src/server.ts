import express from "express";
import router from "./routes/auth.route";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
connectDB();
const port = process.env.PORT;

const app = express();

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
