import { Request, Response } from "express";
import { User } from "../../models/auth.model";
import { Employer } from "../../models/employer.model";

export const updateEmployerProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const {
      companyName,
      companyLogoUrl,
      companyDescription,
      location,
      industry,
      jobListings,
    } = req.body;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "EMPLOYER") {
      return res.status(404).json({
        status: "fail",
        message: "No autherized!",
      });
    }
    const EmployerProfile = await Employer.findOneAndUpdate(
      { userId },
      {
        companyName,
        companyLogoUrl,
        companyDescription,
        location,
        industry,
        jobListings,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      EmployerProfile,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
