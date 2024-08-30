import { Request, Response } from "express";

import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";
import { JobSeeker } from "../../models/jobseeker.model";
import mongoose from "mongoose";

export const applyForJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "JOB_SEEKER") {
      return res.status(404).json({
        status: "fail",
        message: "Not autherized to apply for this job!",
      });
    }
    const jobseeker = await JobSeeker.findOne({ userId });

    const job = await JobListing.findById(jobId);

    if (!jobseeker) {
      return res.status(400).json({
        status: "fail",
        message:
          "You have not created applicant Profile yet. Please create applicant profile to apply.",
      });
    }
    if (!job) {
      return res.status(404).json({
        status: "fail",
        message: "No Job Found!",
      });
    }

    if (jobseeker._id) {
      const jobseekerId = jobseeker._id as mongoose.ObjectId;
      if (job.applicants.includes(jobseekerId)) {
        return res.status(400).json({
          status: "fail",
          message: "You have already applied for this job",
        });
      }
      if (job) {
        job.applicants.push(jobseekerId);
        await job.save();
      }
    }
    res.status(200).json({
      status: "success",
      message: "Successfully applied for this job!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
