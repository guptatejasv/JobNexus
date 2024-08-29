import { Schema, Document, model } from "mongoose";

export interface IUNIVERSITY extends Document {
  userId: string;
  universityName: string;
  univertisyLogoUrl: string;
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
    univertisyLogoUrl: {
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
    industry: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const University = model<IUNIVERSITY>("University", UniversitySchema);
