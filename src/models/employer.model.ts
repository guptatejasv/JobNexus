import mongoose, { Schema, Document, model, ObjectId } from "mongoose";

export interface IEMPLOYER extends Document {
  userId: ObjectId;
  companyName: string;
  companyLogoUrl: string;
  companyDescription: string;
  location: string;
  industry: string;
  jobListings: [ObjectId];
}

const EmployerSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLogoUrl: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      default: false,
    },
    jobListings: [
      { type: mongoose.Schema.ObjectId, ref: "JobListings", required: true },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Employer = model<IEMPLOYER>("Employer", EmployerSchema);
