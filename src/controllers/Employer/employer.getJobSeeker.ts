import { Request, Response } from "express";

import { User } from "../../models/auth.model";
import { JobSeeker } from "../../models/jobseeker.model";
export const getJobSeeker = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }

    const jobseeker = await JobSeeker.findById(id);

    res.status(200).json({
      status: "success",
      jobseeker,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
