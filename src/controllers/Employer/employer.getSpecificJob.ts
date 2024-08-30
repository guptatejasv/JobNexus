import { Request, Response } from "express";
import { Employer } from "../../models/employer.model";
import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";
import { JobSeeker } from "../../models/jobseeker.model";
export const getSpecificJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;
    const profile = await Employer.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        status: "fail",
        message: "No Employer Profile Found!",
      });
    }
    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }

    const job = await JobListing.findById(jobId)
      .populate({ path: "applicants", model: JobSeeker })
      .exec();
    res.status(200).json({
      status: "success",
      job,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
