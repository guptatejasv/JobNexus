import { Request, Response } from "express";
import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";
import { Employer } from "../../models/employer.model";
import mongoose from "mongoose";
export const updateJobListings = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;
    const { title, description, requirements, location, salaryRange } =
      req.body;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }

    const employer = await Employer.findOne({ userId });
    if (!employer) {
      return res.status(400).json({
        status: "fail",
        message:
          "You have not created EmployerId Yet. Please Create Employer Id.",
      });
    }

    const employerProfile = await JobListing.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements,
        location,
        salaryRange,
      },
      { new: true }
    );

    const JobList = await Employer.findOne({ userId });
    if (JobList) {
      const JobListId = employerProfile?._id as mongoose.ObjectId;
      console.log(JobListId);
      JobList.jobListings.push(JobListId);
      await JobList.save();
    }

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
