import { Router } from "express";
import { createEmployerProfile } from "../controllers/Employer/employer.createProfile";
import { verify_token } from "../helper/jwtVerify";
import { getEmployerProfile } from "../controllers/Employer/employer.getProfile";
import { updateEmployerProfile } from "../controllers/Employer/employer.updateProfile";
import { createJobListings } from "../controllers/Employer/employer.createJobListings";

const EmployerRouter = Router();

EmployerRouter.post(
  "/createEmployerProfile",
  verify_token,
  createEmployerProfile
);
EmployerRouter.get("/getEmployerProfile", verify_token, getEmployerProfile);
EmployerRouter.patch(
  "/updateEmployerProfile",
  verify_token,
  updateEmployerProfile
);
EmployerRouter.post("/createJobListings", verify_token, createJobListings);
export default EmployerRouter;
