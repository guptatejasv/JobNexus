import { Request, Response } from "express";
import { JobSeeker } from "../../models/jobseeker.model";
import { User } from "../../models/auth.model";

export const getJobProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user?.role !== "JOB_SEEKER") {
      return res.status(401).json({
        status: "fail",
        message: "You are not authorized to access profile.",
      });
    }
    const profile = await JobSeeker.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        status: "fail",
        message: "No JobSeeker Profile Found!",
      });
    }

    res.status(200).json({
      status: "success",
      profile,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
