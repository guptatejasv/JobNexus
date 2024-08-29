import { Request, Response } from "express";
import { User } from "../../models/auth.model";
import crypto from "crypto";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { transporter } from "../../helper/nodemailer";
dotenv.config();

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const hashedtoken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedtoken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or expired",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    const secret = process.env.JWT_SECRET as string;
    const token = sign({ id: user._id }, secret, {
      expiresIn: "90d",
    });
    // localStorage.setItem("authToken", token);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "JobNexus: Password Changed Successfully!",
      text: "Your Password at JobNexus Portal has been changed successfully!",
    });
    res.status(200).json({
      status: "success",
      message: "Password changed successfully!",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
