import { Request, Response } from "express";

import { User } from "../../models/auth.model";
import { JobListing } from "../../models/jobListings.model";
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "ADMIN") {
      return res.status(404).json({
        status: "fail",
        message: "Not autherized!",
      });
    }
    await JobListing.findByIdAndDelete(id);
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
