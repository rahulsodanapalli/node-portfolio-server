import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.model';
import { sendSuccess, sendError } from '../utils/response';

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    return sendSuccess(res, projects, 'Projects fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { title, subtitle, category, desc, imageMockup, specs } = req.body;
    const newProject = await Project.create({
      title,
      subtitle,
      category,
      desc,
      imageMockup,
      specs,
    });
    return sendSuccess(res, newProject, 'Project created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, subtitle, category, desc, imageMockup, specs } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, subtitle, category, desc, imageMockup, specs },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, updatedProject, 'Project updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, null, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};
