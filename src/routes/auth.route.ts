import { Router } from "express";
import { register } from "../controllers/Authentication/user.register";
import { login } from "../controllers/Authentication/user.login";
import { forgetPassword } from "../controllers/Authentication/user.forgetPassword";
import { resetPassword } from "../controllers/Authentication/user.resetPassword";
import { getProfile } from "../controllers/Authentication/user.getProfile";
import { verify_token } from "../helper/jwtVerify";

const AuthRouter = Router();

AuthRouter.post("/auth/register", register);
AuthRouter.post("/auth/login", login);
AuthRouter.post("/auth/forgetPassword", forgetPassword);
AuthRouter.post("/auth/resetPassword/:token", resetPassword);
AuthRouter.get("/auth/me", verify_token, getProfile);

export default AuthRouter;
