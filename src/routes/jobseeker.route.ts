import { Router } from "express";
import { createJobProfile } from "../controllers/JobSeeker/jobSeeker.createProfile";
import { verify_token } from "../helper/jwtVerify";
import { getJobProfile } from "../controllers/JobSeeker/jobSeeker.getProfile";
import { updateJobProfile } from "../controllers/JobSeeker/jobSeeker.updateProfile";

const JobseekerRouter = Router();

JobseekerRouter.post("/createJobProfile", verify_token, createJobProfile);
JobseekerRouter.get("/getJobProfile", verify_token, getJobProfile);
JobseekerRouter.patch("/updateJobProfile", verify_token, updateJobProfile);

export default JobseekerRouter;
