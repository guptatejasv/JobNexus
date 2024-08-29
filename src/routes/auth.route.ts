import { Router } from "express";
import { register } from "../controllers/Authentication/user.register";
import { login } from "../controllers/Authentication/user.login";
import { forgetPassword } from "../controllers/Authentication/user.forgetPassword";
import { resetPassword } from "../controllers/Authentication/user.resetPassword";
import { getProfile } from "../controllers/Authentication/user.getProfile";
import { verify_token } from "../helper/jwtVerify";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/forgetPassword", forgetPassword);
router.post("/auth/resetPassword/:token", resetPassword);
router.get("/auth/me", verify_token, getProfile);

export default router;
