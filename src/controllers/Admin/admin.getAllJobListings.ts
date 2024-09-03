import { Request, Response } from "express";

import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";
export const getAllJobListing = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "ADMIN") {
      return res.status(404).json({
        status: "fail",
        message: "Not autherized!",
      });
    }
    const jobListings = await JobListing.find();
    res.status(200).json({
      status: "success",
      total: jobListings.length,
      jobListings,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
