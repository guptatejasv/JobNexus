import { Router } from "express";
import { register } from "../controllers/Authentication/user.register";
import { login } from "../controllers/Authentication/user.login";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
export default router;
