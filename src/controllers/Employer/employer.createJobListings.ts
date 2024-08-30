import { Request, Response } from "express";
import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";

export const createJobListings = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const {
      title,
      description,
      requirements,
      location,
      salaryRange,
      applicants,
    } = req.body;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }

    const employerProfile = await JobListing.create({
      employerId: userId,
      title,
      description,
      requirements,
      location,
      salaryRange,
      applicants,
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
