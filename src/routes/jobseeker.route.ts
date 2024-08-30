import { Router } from "express";
import { createJobProfile } from "../controllers/JobSeeker/jobSeeker.createProfile";
import { verify_token } from "../helper/jwtVerify";
import { getJobProfile } from "../controllers/JobSeeker/jobSeeker.getProfile";
import { updateJobProfile } from "../controllers/JobSeeker/jobSeeker.updateProfile";
import { applyForJob } from "../controllers/JobSeeker/jobSeeker.applyJob";
import { getAppliedJobs } from "../controllers/JobSeeker/jobSeeker.getAllApplied";
import { getAppliedJob } from "../controllers/JobSeeker/jobSeeker.getAppliedJob";

const JobseekerRouter = Router();

JobseekerRouter.post("/createJobProfile", verify_token, createJobProfile);
JobseekerRouter.get("/getJobProfile", verify_token, getJobProfile);
JobseekerRouter.patch("/updateJobProfile", verify_token, updateJobProfile);
JobseekerRouter.post("/applyForJob/:jobId", verify_token, applyForJob);
JobseekerRouter.get("/getAppliedJobs", verify_token, getAppliedJobs);
JobseekerRouter.get("/getAppliedJob/:jobId", verify_token, getAppliedJob);

export default JobseekerRouter;
