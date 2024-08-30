import { Request, Response } from "express";
import { University } from "../../models/university.model";
export const getUniversityProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const profile = await University.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        status: "fail",
        message: "No University Profile Found!",
      });
    }

    res.status(200).json({
      status: "success",
      profile,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
