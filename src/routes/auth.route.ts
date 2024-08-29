import { Router } from "express";
import { register } from "../controllers/Authentication/user.register";
import { login } from "../controllers/Authentication/user.login";
import { forgetPassword } from "../controllers/Authentication/user.forgetPassword";
import { resetPassword } from "../controllers/Authentication/user.resetPassword";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/forgetPassword", forgetPassword);
router.post("/auth/resetPassword", resetPassword);
export default router;
