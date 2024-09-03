import { Request, Response } from "express";

import { User } from "../../models/auth.model";
export const getUser = async (req: Request, res: Response) => {
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

    const users = await User.findById(id);
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};