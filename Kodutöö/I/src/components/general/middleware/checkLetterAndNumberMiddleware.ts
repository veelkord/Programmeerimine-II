import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";

const checkAlphabetAndNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { semester, scheduled, subject } = req.body;
  let testSemester = true;
  let testScheduled = true;
  let testSubject = true;

  semester ? (testSemester = testString(semester)) : true;
  scheduled ? (testScheduled = testString(scheduled)) : true;
  subject ? (testSubject = testString(subject)) : true;

  if (testSemester && testScheduled && testSubject) {
    next();
  } else {
    return res.status(responseCodes.badRequest).json({
      error: "Insert only letters, numbers or -.,!",
    });
  }
};
// kuhu seda struktuuris panna ?
function testString(name: string) {
  let result = name.match(/[0-9A-Za-zÄÖÜäöü -.,!?]/g);
  if (result?.length == name.length) {
    return true;
  } else {
    return false;
  }
}

export default checkAlphabetAndNumber;
