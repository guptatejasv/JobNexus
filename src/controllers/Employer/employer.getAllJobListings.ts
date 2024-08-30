import { Request, Response } from "express";
import { Employer } from "../../models/employer.model";
import { JobListing } from "../../models/jobListings.model";
export const getAllJobListings = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const employer = await Employer.findOne({ userId });

    const jobListings = await JobListing.find({ employerId: employer?._id });
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
