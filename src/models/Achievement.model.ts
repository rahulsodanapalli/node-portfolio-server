import { Schema, model, Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  desc: string;
  date?: string;
  createdAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Achievement description is required'],
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Achievement = model<IAchievement>('Achievement', AchievementSchema);
