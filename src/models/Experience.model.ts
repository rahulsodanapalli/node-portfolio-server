import { Schema, model, Document } from 'mongoose';

export interface IExperience extends Document {
  role: string;
  company: string;
  location: string;
  period: string;
  details: string[];
  tech: string[];
  createdAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    period: {
      type: String,
      required: [true, 'Period (e.g. Aug 24 - Present) is required'],
      trim: true,
    },
    details: {
      type: [String],
      required: [true, 'Work details / bullet points are required'],
      default: [],
    },
    tech: {
      type: [String],
      required: [true, 'Technologies used are required'],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Experience = model<IExperience>('Experience', ExperienceSchema);
