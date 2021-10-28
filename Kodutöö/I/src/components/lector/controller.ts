import express, { Request, Response, Application } from "express";
import responseCodes from "../general/responseCodes";
import lecturerService from "./service";

const lecturerController = {
  // Konkreetne õppejõud ja tema antavad ained

  getLecturerAndHisCoursesById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const user = lecturerService.getLecturerById(id);
    const courses = lecturerService.getCourseById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    } else {
      return res.status(responseCodes.ok).json({
        user,
        courses,
      });
    }
  },

  // Õppejõu kustutamine ainult siis kui tal antavaid ained pole.

  deleteLecturerWhenNoCoursesById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const index = lecturerService.getLecturerIndex(id);
    if (index < 0) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    } else {
      const courseExists = lecturerService.deleteLecturerById(id);
      if (courseExists) {
        return res.status(responseCodes.badRequest).json({
          error: "Lecturer has active courses!",
        });
      } else {
        return res.status(responseCodes.noContent).send();
      }
    }
  },

  // Uue Õppejõu lisamine koos aine/ainetega - ained on kohtustulikud

  addLecturerAndHisCourses: (req: Request, res: Response) => {
    const { firstName, lastName, semester, course, scheduled } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: "First name is required",
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: "Last name is required",
      });
    }
    if (!course) {
      return res.status(responseCodes.badRequest).json({
        error: "Course is required",
      });
    } else {
      const id = lecturerService.createlecturerAndHisCourses(
        firstName,
        lastName,
        semester,
        course,
        scheduled
      );
      return res.status(responseCodes.created).json({
        id,
      });
    }
  },
};

export default lecturerController;
