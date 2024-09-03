import { Request, Response } from "express";

import { JobListing } from "../models/jobListings.model";

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobListings = await JobListing.find()
      .select("-applicants")
      .populate({
        path: "employerId",
      })
      .exec();

    res.status(200).json({
      status: "success",
      total: jobListings.length,
      jobListings,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
