import { Router } from "express";
import { getAllJobs } from "../controllers/getAllJobs";

const router = Router();
router.get("/job-listings", getAllJobs);

export default router;
