import { Request, Response } from "express";
import { IJOBLISTING, JobListing } from "../models/jobListings.model";

export const SearchByFilter = async (req: Request, res: Response) => {
  try {
    const jobQuery: Record<string, unknown> = {};

    // Search for complaints
    if (
      req.query.title ||
      req.query.location ||
      req.query.minSalary ||
      req.query.maxSalary ||
      req.query.jobType ||
      req.query.company
    ) {
      const { title, location, minSalary, maxSalary, jobType, company } =
        req.query;
      if (title) jobQuery.title = { $regex: title, $options: "i" };
      if (location) jobQuery.location = { $regex: location, $options: "i" }; // Case-insensitive search
      if (minSalary) jobQuery.minSalary = { $regex: minSalary, $options: "i" }; // Case-insensitive search
      if (maxSalary) jobQuery.maxSalary = { $regex: maxSalary, $options: "i" }; // Case-insensitive search
      if (jobType) jobQuery.jobType = { $regex: jobType, $options: "i" }; // Case-insensitive search
      if (company) jobQuery.company = { $regex: company, $options: "i" }; // Case-insensitive search

      const jobs: IJOBLISTING[] = await JobListing.find(jobQuery).select(
        "-applicants"
      );

      return res.status(200).json({
        status: "success",
        total: jobs.length,
        data: jobs,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
