import { Router } from "express";
import { createJobProfile } from "../controllers/JobSeeker/jobSeeker.createProfile";
import { verify_token } from "../helper/jwtVerify";

const JobseekerRouter = Router();

JobseekerRouter.post("/createJobProfile", verify_token, createJobProfile);

export default JobseekerRouter;
