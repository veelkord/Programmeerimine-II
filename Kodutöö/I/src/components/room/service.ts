import { ElementFlags } from "typescript";
import db from "../../db";
import Room from "./interface";

const roomService = {
  getRoomId: (id: number): Room | undefined => {
    const room = db.rooms.find((element) => element.id === id);
    return room;
  },
  createRoom: (room: string): number => {
    let id = db.rooms.length + 1;
    db.rooms.push({ id, room });
    return id;
  },
  deleteRoom: (id: number): boolean => {
    const index = db.rooms.findIndex((element) => element.id === id);
    db.rooms.splice(index, 1);
    return true;
  },
  updateRoom: (data: { id: number; room: string }): boolean => {
    const { id, room } = data;
    let index = db.rooms.findIndex((element) => element.id === id);
    if (index >= 0) {
      db.rooms[index].room = room;
      return true;
    } else {
      return false;
    }
  },
};

export default roomService;
