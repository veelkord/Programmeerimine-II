import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";
import validateField from "../services/service";

const checkAlphabetAndNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { semester, scheduled, subject } = req.body;
  let testSemester = true;
  let testScheduled = true;
  let testSubject = true;

  semester ? (testSemester = validateField.testFields(semester)) : true;
  scheduled ? (testScheduled = validateField.testFields(scheduled)) : true;
  subject ? (testSubject = validateField.testFields(subject)) : true;

  if (testSemester && testScheduled && testSubject) {
    next();
  } else {
    return res.status(responseCodes.badRequest).json({
      error: "Insert only letters, numbers or -.,!",
    });
  }
};

export default checkAlphabetAndNumber;
