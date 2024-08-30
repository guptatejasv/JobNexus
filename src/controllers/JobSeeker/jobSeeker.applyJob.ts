import { Request, Response } from "express";

import { JobListing } from "../../models/jobListings.model";
import { User } from "../../models/auth.model";
import { JobSeeker } from "../../models/jobseeker.model";
import mongoose from "mongoose";
import { transporter } from "../../helper/nodemailer";
import { Employer } from "../../models/employer.model";

export const applyForJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const user = await User.findById(userId);
    console.log(user?.role);
    if (user?.role !== "JOB_SEEKER") {
      return res.status(404).json({
        status: "fail",
        message: "Not autherized to apply for this job!",
      });
    }
    const jobseeker = await JobSeeker.findOne({ userId });

    const job = await JobListing.findById(jobId);
    if (job?.endDate) {
      const currentDate = new Date();

      if (job?.endDate < currentDate) {
        return res.status(400).json({
          status: "fail",
          message: "Application Closed! You can not apply for this job",
        });
      }
    }
    console.log(job?.employerId);
    const company = await Employer.findOne({ _id: job?.employerId });

    if (!jobseeker) {
      return res.status(400).json({
        status: "fail",
        message:
          "You have not created applicant Profile yet. Please create applicant profile to apply.",
      });
    }
    if (!job) {
      return res.status(404).json({
        status: "fail",
        message: "No Job Found!",
      });
    }

    if (jobseeker._id) {
      const jobseekerId = jobseeker._id as mongoose.ObjectId;
      if (job.applicants.includes(jobseekerId)) {
        return res.status(400).json({
          status: "fail",
          message: "You have already applied for this job",
        });
      }
      if (job) {
        job.applicants.push(jobseekerId);
        await job.save();
      }
    }
    console.log(user.email);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `JobNexus Application: ${job.title}!`,
      // text: "You have successfully registered at JobNexus. Please Login to the JobNexus to complete the profile.",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #5B99C2;">Job Application Successful!</h2>
          <p>Dear <strong>${user.name}</strong>,</p>

          <p>Thank you for applying for the <strong>${job.title}</strong> position at <strong>${company?.companyName}</strong> through JobNexus. Your application has been successfully submitted.</p>

          <p>We appreciate your interest in this opportunity and you will be keep informed by HR for any updates regarding your application</p>

          <p>In the meantime, if you have any questions or need further assistance, feel free to reach out to us.</p>

          <p>Best regards,</p>
          <p><strong>The JobNexus Team</strong></p>

          <footer style="margin-top: 20px; font-size: 0.9em; color: #777;">
              <p>This is an automated message, please do not reply.</p>
          </footer>
      </body>
      </html>
  `,
    });
    res.status(200).json({
      status: "success",
      message: "Successfully applied for this job!",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err || "An error occurred while getting Profile.",
    });
  }
};
