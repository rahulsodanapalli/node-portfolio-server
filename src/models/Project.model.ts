import { Schema, model, Document } from 'mongoose';

export interface IProjectSpec {
  challenge: string;
  solution: string;
  architecture: string;
  performance: string;
  tech: string[];
  impact: string;
}

export interface IProject extends Document {
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  imageMockup: string;
  specs: IProjectSpec;
  createdAt: Date;
}

const ProjectSpecSchema = new Schema<IProjectSpec>({
  challenge: { type: String, required: true, trim: true },
  solution: { type: String, required: true, trim: true },
  architecture: { type: String, required: true, trim: true },
  performance: { type: String, required: true, trim: true },
  tech: { type: [String], required: true, default: [] },
  impact: { type: String, required: true, trim: true },
});

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, 'Project subtitle is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    imageMockup: {
      type: String,
      required: [true, 'Image mockup label (e.g. "doe", "taqa") is required'],
      trim: true,
    },
    specs: {
      type: ProjectSpecSchema,
      required: [true, 'Project specifications are required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Project = model<IProject>('Project', ProjectSchema);
