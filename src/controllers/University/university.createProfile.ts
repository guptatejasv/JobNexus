import { Request, Response } from "express";
import { User } from "../../models/auth.model";
import { University } from "../../models/university.model";

export const createUniversityProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const {
      universityName,
      universityLogoUrl,
      universityDescription,
      collegeName,
      collegeDescription,
      collegeLogoUrl,
      location,
    } = req.body;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "MODERATOR") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }

    const universityProfile = await University.create({
      userId,
      universityName,
      universityLogoUrl,
      universityDescription,
      collegeName,
      collegeLogoUrl,
      collegeDescription,
      location,
    });

    res.status(201).json({
      status: "success",
      universityProfile,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
