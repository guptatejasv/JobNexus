import { Request, Response } from "express";
import { User } from "../../models/auth.model";
import { JobListing } from "../../models/jobListings.model";

import { Employer } from "../../models/employer.model";

export const getAppliedJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const user = await User.findById(userId);
    if (user?.role !== "JOB_SEEKER") {
      return res.status(401).json({
        status: "fail",
        message: "You are not authorized!.",
      });
    }

    const applied = await JobListing.findById(jobId)
      .select("-applicants")
      .populate({ path: "employerId", model: Employer })
      .exec();

    res.status(200).json({
      status: "success",
      applied,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
