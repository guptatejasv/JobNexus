import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "EMPLOYER", "JOB_SEEKER", "MODERATOR", "GUEST"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const User = model<IUser>("User", UserSchema);
