import { Router } from "express";
import { getAllJobs } from "../controllers/getAllJobs";
import { SearchByFilter } from "../controllers/searchByFilterJob";

const router = Router();
router.get("/job-listings", getAllJobs);
router.get("/job/search", SearchByFilter);

export default router;
