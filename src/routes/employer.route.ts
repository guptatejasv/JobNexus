import { Router } from "express";
import { createEmployerProfile } from "../controllers/Employer/employer.createProfile";
import { verify_token } from "../helper/jwtVerify";
import { getEmployerProfile } from "../controllers/Employer/employer.getProfile";
import { updateEmployerProfile } from "../controllers/Employer/employer.updateProfile";

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

export default EmployerRouter;
