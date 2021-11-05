import express, { Request, Response, Application } from "express";
import responseCodes from "../general/responseCodes";
import { SubjectData } from "./interfaces";
import subjectServices from "./service";

const subjectController = {
  getSubjectById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const subject = subjectServices.getSubjectById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id: ${id}`,
      });
    } else {
      return res.status(responseCodes.ok).json({
        subject,
      });
    }
  },
  addSubject: (req: Request, res: Response) => {
    const { lecturerId, courseId, subject, scheduled } = req.body;
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: "Subject is missing",
      });
    }
    if (!scheduled) {
      return res.status(responseCodes.badRequest).json({
        error: "Scheduled is missing",
      });
    }
    if (!courseId) {
      return res.status(responseCodes.badRequest).json({
        error: "Course id is missing",
      });
    }
    if (!lecturerId) {
      return res.status(responseCodes.badRequest).json({
        error: "Lecturer id is missing",
      });
    } else {
      const subjectData: SubjectData = {
        lecturerId,
        courseId,
        subject,
        scheduled,
      };
      const id = subjectServices.createSubject(subjectData);
      return res.status(responseCodes.created).json({
        id,
      });
    }
  },
  deleteSubject: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const subjectExists = subjectServices.getSubjectById(id);
    if (!subjectExists) {
      return res.status(responseCodes.badRequest).json({
        message: `Subject not found with id: ${id}`,
      });
    } else {
      const subjectExists = subjectServices.deleteSubject(id);
      if (subjectExists) {
        return res.status(responseCodes.noContent).send();
      }
    }
  },
  //   Õppeaine andmete uuendamine, muudame semestrit ja toimumis aega

  updateSubjectById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { courseId, scheduled } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!courseId && !scheduled) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to update",
      });
    }
    const subjectExists = subjectServices.updateSubjectById({
      id,
      courseId,
      scheduled,
    });
    if (!subjectExists) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id: ${id}`,
      });
    }

    return res.status(responseCodes.noContent).send();
  },
};

export default subjectController;
