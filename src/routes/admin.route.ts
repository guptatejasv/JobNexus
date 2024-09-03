import { Router } from "express";
import { verify_token } from "../helper/jwtVerify";
import { getAllUsers } from "../controllers/Admin/admin.getAllUser";
import { getUser } from "../controllers/Admin/admin.getUser";
import { deleteJob } from "../controllers/Admin/admin.deleteJobListings";
import { getAllJobListing } from "../controllers/Admin/admin.getAllJobListings";
import { deleteUser } from "../controllers/Admin/admin.deleteUser";

const AdminRouter = Router();

AdminRouter.get("/users", verify_token, getAllUsers);
AdminRouter.get("/users/:id", verify_token, getUser);
AdminRouter.delete("/job-listings/:id", verify_token, deleteJob);
AdminRouter.get("/job-listings", verify_token, getAllJobListing);
AdminRouter.delete("/users/:id", verify_token, deleteUser);
export default AdminRouter;
