import { Router } from "express";
import { verify_token } from "../helper/jwtVerify";
import { createUniversityProfile } from "../controllers/University/university.createProfile";
import { getUniversityProfile } from "../controllers/University/university.getProfile";
import { updateUniversityProfile } from "../controllers/University/university.updateProfile";

const UniversityRouter = Router();
UniversityRouter.post("/profile", verify_token, createUniversityProfile);
UniversityRouter.get("/profile", verify_token, getUniversityProfile);
UniversityRouter.patch("/profile", verify_token, updateUniversityProfile);
export default UniversityRouter;
