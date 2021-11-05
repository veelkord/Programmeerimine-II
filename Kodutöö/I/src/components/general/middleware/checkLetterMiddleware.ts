import { Request, Response, NextFunction } from "express";
import responseCodes from "../responseCodes";

const checkAlphabet = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName } = req.body;
  console.log(req.body);
  let testFirst = testName(firstName);
  let testLast = testName(lastName);
  if (testFirst && testLast) {
    next();
  } else {
    return res.status(responseCodes.badRequest).json({
      error: "Insert only letters, space or -",
    });
  }
};
// kuhu seda struktuuris panna ?
function testName(name: string) {
  let result = name.match(/[A-Za-zÄÖÜäöü -]/g);
  if (result?.length == name.length) {
    return true;
  } else {
    return false;
  }
}

export default checkAlphabet;
