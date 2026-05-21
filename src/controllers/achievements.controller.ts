import { Request, Response, NextFunction } from 'express';
import { Achievement } from '../models/Achievement.model';
import { sendSuccess, sendError } from '../utils/response';

export const getAchievements = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    return sendSuccess(res, achievements, 'Achievements fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { title, desc, date } = req.body;
    const newAchievement = await Achievement.create({ title, desc, date });
    return sendSuccess(res, newAchievement, 'Achievement created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, desc, date } = req.body;

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      id,
      { title, desc, date },
      { new: true, runValidators: true }
    );

    if (!updatedAchievement) {
      return sendError(res, 'Achievement not found', 404);
    }

    return sendSuccess(res, updatedAchievement, 'Achievement updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedAchievement = await Achievement.findByIdAndDelete(id);

    if (!deletedAchievement) {
      return sendError(res, 'Achievement not found', 404);
    }

    return sendSuccess(res, null, 'Achievement deleted successfully');
  } catch (error) {
    next(error);
  }
};
