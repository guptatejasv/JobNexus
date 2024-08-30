import { Router } from "express";
import { verify_token } from "../helper/jwtVerify";
import { createUniversityProfile } from "../controllers/University/university.createProfile";
import { getUniversityProfile } from "../controllers/University/university.getProfile";

const UniversityRouter = Router();
UniversityRouter.post("/createProfile", verify_token, createUniversityProfile);
UniversityRouter.get("/getProfile", verify_token, getUniversityProfile);
export default UniversityRouter;
