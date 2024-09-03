import { Request, Response } from "express";
import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";

export const removeJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }

    await JobListing.findByIdAndDelete(jobId);

    res.status(204).json({
      status: "success",
      message: "Deleted Successfully!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
