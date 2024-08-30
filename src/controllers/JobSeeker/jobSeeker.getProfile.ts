import { Request, Response } from "express";
import { JobSeeker } from "../../models/jobseeker.model";

export const getJobProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
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
