import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import lecturerService from "./service";

const lecturerController = {
  getLecturerById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const lecturer = lecturerService.getLecturerById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!lecturer) {
      return res.status(responseCodes.badRequest).json({
        error: `No lecturer found with id: ${id}`,
      });
    } else {
      return res.status(responseCodes.ok).json({
        lecturer,
      });
    }
  },

  // Õppejõu kustutamine ainult siis kui tal antavaid ained pole.

  deleteLecturerWhenNoSubjectsById: (req: Request, res: Response) => {
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
      const subjectExists = lecturerService.deleteLecturerById(id);
      if (subjectExists) {
        return res.status(responseCodes.badRequest).json({
          error: "Lecturer has active subjects!",
        });
      } else {
        return res.status(responseCodes.noContent).send();
      }
    }
  },

  // Uue Õppejõu lisamine

  addLecturer: (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: "First name is required",
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: "Last name is required",
      });
    } else {
      const id = lecturerService.createlecturer(firstName, lastName);
      return res.status(responseCodes.created).json({
        id,
      });
    }
  },
  updateLecturerById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: "Provide firstname",
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: "Provide lastname",
      });
    }
    const lecturerExists = lecturerService.updateLecturerById({
      id,
      firstName,
      lastName,
    });
    if (!lecturerExists) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }

    return res.status(responseCodes.noContent).send();
  },
};

export default lecturerController;
