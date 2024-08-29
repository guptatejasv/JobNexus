import mongoose, { Schema, Document, model } from "mongoose";

export interface IJOBSEEKER extends Document {
  userId: string;
  resumeUrl: string;
  email: string;
  skills: string;
  experience: string;
  education: string;
  jobPreferences: string;
}

const JobSeekerSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    jobPreferences: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const JobSeeker = model<IJOBSEEKER>("JobSeeker", JobSeekerSchema);
