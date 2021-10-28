import express, { Request, Response, Application } from "express";
import responseCodes from "../general/responseCodes";
import courseServices from "./service";

const courseController = {
  //   Õppeaine andmete uuendamine, muudame semestrit ja toimumis aega

  updateCourseById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { semester, scheduled } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!semester && !scheduled) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to update",
      });
    }
    const courseExists = courseServices.updateCourseById({
      id,
      semester,
      scheduled,
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
