import { Schema, Document, model } from "mongoose";

export interface IUNIVERSITY extends Document {
  userId: string;
  universityName: string;
  collegeName?: string;
  collegeLogoUrl?: string;
  collegeDescription?: string;
  universityLogoUrl: string;
  universityDescription: string;
  location: string;
}

const UniversitySchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    universityName: {
      type: String,
      required: true,
    },
    universityLogoUrl: {
      type: String,
      required: true,
    },
    universityDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
    },
    collegeLogoUrl: {
      type: String,
    },
    collegeDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const University = model<IUNIVERSITY>("University", UniversitySchema);
