import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import courseService from "./service";

const courseController = {
  getCourseById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const course = courseService.getCourseyId(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: `No course found with id: ${id}`,
      });
    } else {
      return res.status(responseCodes.ok).json({
        course,
      });
    }
  },
  addCourse: (req: Request, res: Response) => {
    const { course } = req.body;
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: "Course is missing",
      });
    } else {
      const id = courseService.createCourse(course);
      return res.status(responseCodes.created).json({
        id,
      });
    }
  },
  deleteCourse: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const courseExists = courseService.getCourseyId(id);
    if (!courseExists) {
      return res.status(responseCodes.badRequest).json({
        message: `Course not found with id: ${id}`,
      });
    } else {
      const subjectExists = courseService.deleteCourse(id);
      if (subjectExists) {
        return res.status(responseCodes.badRequest).json({
          error: "Course has active subjects!",
        });
      } else {
        return res.status(responseCodes.noContent).send();
      }
    }
  },
  updateCourseById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { course } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to update",
      });
    }
    const courseExists = courseService.updateCourse({
      id,
      course,
    });
    if (!courseExists) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }

    return res.status(responseCodes.noContent).send();
  },
};

export default courseController;
