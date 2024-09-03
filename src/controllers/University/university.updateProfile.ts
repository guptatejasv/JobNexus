import { Request, Response } from "express";
import { User } from "../../models/auth.model";
import { University } from "../../models/university.model";

export const updateUniversityProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "MODERATOR") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }
    const universityProfile = await University.findOneAndUpdate(
      { userId },
      req.body,
      { new: true }
    );

    res.status(200).json({
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
