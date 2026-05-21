import { Schema, model, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string; // e.g., "Frontend Core", "State Management", "Data Viz & Charts", etc.
  level?: string;
  createdAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Skill = model<ISkill>('Skill', SkillSchema);
