import { Request, Response } from "express";
import { JobSeeker } from "../../models/jobseeker.model";
import { User } from "../../models/auth.model";

export const createJobProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { resumeUrl, skills, jobPreferences, experience, education } =
      req.body;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "JOB_SEEKER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }
    console.log("Hello3");
    const jobSeekerProfile = await JobSeeker.create({
      userId,
      resumeUrl,
      skills,
      jobPreferences,
      experience,
      education,
    });

    res.status(201).json({
      status: "success",
      jobSeekerProfile,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
