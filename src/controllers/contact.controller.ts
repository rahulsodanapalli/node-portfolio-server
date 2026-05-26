import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/Message.model';
import { sendContactEmail } from '../utils/email';
import { sendSuccess, sendError } from '../utils/response';

// Public contact submission endpoint
export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, email, projectType, message } = req.body;

    if (!name || !email || !projectType || !message) {
      return sendError(res, 'All brief specification fields are required.', 400);
    }

    // 1. Record the message securely in MongoDB
    const newMessage = await Message.create({
      name,
      email,
      projectType,
      message,
    });

    // 2. Dispatch real email to the inbox (graceful fallback internally if unconfigured)
    const emailTransmitted = await sendContactEmail({
      name,
      email,
      projectType,
      message,
    });

    return sendSuccess(
      res,
      {
        message: newMessage,
        emailTransmitted,
      },
      'Contact brief submitted and dispatched successfully.',
      201
    );
  } catch (error) {
    next(error);
  }
};

// Protected administrative messages directory listing
export const getContactMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return sendSuccess(res, messages, 'Contact messages listed successfully.');
  } catch (error) {
    next(error);
  }
};

// Protected administrative message delete controller
export const deleteContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message) {
      return sendError(res, 'Requested inquiry brief was not found.', 404);
    }

    await Message.findByIdAndDelete(id);
    return sendSuccess(res, null, 'Inquiry brief successfully purged from logs.');
  } catch (error) {
    next(error);
  }
};
