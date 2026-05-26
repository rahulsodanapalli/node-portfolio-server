import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, 'Sender name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Sender email address is required'],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, 'Project type focus is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Brief description message is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>('Message', MessageSchema);
