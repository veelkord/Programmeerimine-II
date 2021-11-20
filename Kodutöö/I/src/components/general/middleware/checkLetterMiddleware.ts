import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";
import validateField from "../services/service";

const checkAlphabet = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName } = req.body;
  console.log(req.body);
  let testFirst = validateField.testName(firstName);
  let testLast = validateField.testName(lastName);
  if (testFirst && testLast) {
    next();
  } else {
    return res.status(responseCodes.badRequest).json({
      error: "Insert only letters, space or -",
    });
  }
};

export default checkAlphabet;
