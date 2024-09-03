import { Router } from "express";
import { createEmployerProfile } from "../controllers/Employer/employer.createProfile";
import { verify_token } from "../helper/jwtVerify";
import { getEmployerProfile } from "../controllers/Employer/employer.getProfile";
import { updateEmployerProfile } from "../controllers/Employer/employer.updateProfile";
import { createJob } from "../controllers/Employer/employer.createJob";
import { getAllJobListings } from "../controllers/Employer/employer.getAllJobListings";
import { getSpecificJob } from "../controllers/Employer/employer.getSpecificJob";
import { updateJobListings } from "../controllers/Employer/employer.updateJobListing";
import { getJobSeeker } from "../controllers/Employer/employer.getJobSeeker";

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
EmployerRouter.post("/job-listings", verify_token, createJob);
EmployerRouter.get("/job-listings", verify_token, getAllJobListings);
EmployerRouter.get("/job-listings/:jobId", verify_token, getSpecificJob);
EmployerRouter.patch("/job-listings/:jobId", verify_token, updateJobListings);
EmployerRouter.get("/jobSeeker/:id", verify_token, getJobSeeker);

export default EmployerRouter;
