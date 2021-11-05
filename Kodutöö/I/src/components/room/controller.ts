import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import roomService from "./service";

const roomController = {
  getRoomById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const room = roomService.getRoomId(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id: ${id}`,
      });
    } else {
      return res.status(responseCodes.ok).json({
        room,
      });
    }
  },
  addRoom: (req: Request, res: Response) => {
    const { room } = req.body;
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: "Room is missing",
      });
    } else {
      const id = roomService.createRoom(room);
      return res.status(responseCodes.created).json({
        id,
      });
    }
  },
  deleteRoom: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const roomExists = roomService.getRoomId(id);
    if (!roomExists) {
      return res.status(responseCodes.badRequest).json({
        message: `Room not found with id: ${id}`,
      });
    } else {
      const subjectExists = roomService.deleteRoom(id);
      if (subjectExists) {
        return res.status(responseCodes.noContent).send();
      }
    }
  },
  updateRoomById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { room } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!room) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to update",
      });
    }
    const roomExists = roomService.updateRoom({
      id,
      room,
    });
    if (!roomExists) {
      return res.status(responseCodes.badRequest).json({
        error: `No room found with id: ${id}`,
      });
    }

    return res.status(responseCodes.noContent).send();
  },
};

export default roomController;
