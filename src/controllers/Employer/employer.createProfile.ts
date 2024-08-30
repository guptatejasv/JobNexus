import { Request, Response } from "express";
import { Employer } from "../../models/employer.model";
import { User } from "../../models/auth.model";

export const createEmployerProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const {
      companyName,
      companyLogoUrl,
      companyDescription,
      location,
      industry,
      jobListings,
    } = req.body;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }
    console.log("Hello3");
    const employerProfile = await Employer.create({
      userId,
      companyName,
      companyLogoUrl,
      companyDescription,
      location,
      industry,
      jobListings,
    });

    res.status(201).json({
      status: "success",
      employerProfile,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
