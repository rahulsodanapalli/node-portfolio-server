import { Request, Response, NextFunction } from 'express';
import { Skill } from '../models/Skill.model';
import { sendSuccess, sendError } from '../utils/response';

export const getSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    return sendSuccess(res, skills, 'Skills fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, category, level } = req.body;
    const newSkill = await Skill.create({ name, category, level });
    return sendSuccess(res, newSkill, 'Skill created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, category, level } = req.body;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { name, category, level },
      { new: true, runValidators: true }
    );

    if (!updatedSkill) {
      return sendError(res, 'Skill not found', 404);
    }

    return sendSuccess(res, updatedSkill, 'Skill updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return sendError(res, 'Skill not found', 404);
    }

    return sendSuccess(res, null, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};
