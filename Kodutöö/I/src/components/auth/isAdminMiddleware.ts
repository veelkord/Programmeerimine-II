import { Request, Response, NextFunction } from "express";
import jwtService from "../general/services/jwtService";
import responseCodes from "../general/responseCodes";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  if (user.role !== "Admin") {
    return res.status(responseCodes.notAuthorized).json({
      error: "You have to be admin for this operation",
    });
  }
  return next();
};

export default isAdmin;
