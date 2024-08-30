import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

export interface IJOBLISTING extends Document {
  employerId: ObjectId;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryRange: string;
  applicants: [ObjectId];
}

const JobListingSchema: Schema = new Schema(
  {
    employerId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salaryRange: {
      type: String,
      required: true,
    },
    applicants: [
      { type: mongoose.Schema.ObjectId, ref: "JobSeeker", required: true },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const JobListing = model<IJOBLISTING>("JobListing", JobListingSchema);
