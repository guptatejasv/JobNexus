import { Request, Response } from "express";
import { User } from "../../models/auth.model";
import bcrypt from "bcryptjs";

import { transporter } from "../../helper/nodemailer";

export const register = async (req: Request, res: Response) => {
  try {
    const { userId, name, email, password, role } = req.body;

    const checkuserId = await User.findOne({ userId });
    if (checkuserId) {
      return res.status(404).json({
        status: "fail",
        message: "This userId is already exist! Please choose different.",
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(404).json({
        status: "fail",
        message: "This email is already exist! Please choose different.",
      });
    }

    // Validate input
    if (!userId || !email || !password || !name || !role) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill all required fields.",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      userId,
      email,
      password: hashedPassword,
      name,
      role,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "JobNexus: Registration Successful!",
      // text: "You have successfully registered at JobNexus. Please Login to the JobNexus to complete the profile.",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #5B99C2;">Welcome to JobNexus!</h2>
        <p>Dear ${user.name},</p>
        <p>We're excited to have you on board. You have successfully registered at JobNexus. Please log in to complete your profile and start exploring our services.</p>
        <a 
          href="https://JobNexus.example.com/login" 
          style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #5B99C2; text-decoration: none; border-radius: 5px; margin-top: 10px;">
          Login to JobNexus
        </a>
        <p style="margin-top: 20px;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p>Best regards,<br/>The JobNexus Team</p>
        <footer style="margin-top: 20px; font-size: 12px; color: #777;">
          <p>You received this email because you registered at JobNexus.</p>
          <p>If this wasn't you, please ignore this email.</p>
        </footer>
      </div>
    `,
    });
    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      data: {
        user,
      },
    });
  } catch (err) {
    // General error response
    res.status(500).json({
      status: "fail",
      message: err || "Error: An error occurred during registration.",
    });
  }
};
