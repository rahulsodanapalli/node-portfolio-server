import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/Experience.model';
import { sendSuccess, sendError } from '../utils/response';

export const getExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Sort so recent experiences appear first (descending or customized sequence)
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return sendSuccess(res, experiences, 'Experiences fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { role, company, location, period, details, tech } = req.body;
    const newExperience = await Experience.create({
      role,
      company,
      location,
      period,
      details,
      tech,
    });
    return sendSuccess(res, newExperience, 'Experience created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { role, company, location, period, details, tech } = req.body;

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { role, company, location, period, details, tech },
      { new: true, runValidators: true }
    );

    if (!updatedExperience) {
      return sendError(res, 'Experience not found', 404);
    }

    return sendSuccess(res, updatedExperience, 'Experience updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return sendError(res, 'Experience not found', 404);
    }

    return sendSuccess(res, null, 'Experience deleted successfully');
  } catch (error) {
    next(error);
  }
};
