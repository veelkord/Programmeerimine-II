import db from "../../db";
import { Subject } from "../subjects/interfaces";
import Lector from "./interfaces";

const lecturerService = {
  getLecturerById: (id: number): Lector | undefined => {
    const lecturer = db.lecturer.find((element) => element.id === id);
    return lecturer;
  },

  getSubjectById: (id: number): Subject[] => {
    const subjects = db.subjects.filter((element) => element.lecturerId === id);
    return subjects;
  },
  getLecturerIndex: (id: number): number => {
    const index = db.lecturer.findIndex((element) => element.id === id);
    return index;
  },
  deleteLecturerById: (id: number): boolean => {
    const index = db.subjects.findIndex((element) => element.lecturerId === id);
    if (index >= 0) {
      return true;
    } else {
      db.lecturer.splice(index, 1);
      return false;
    }
  },
  createlecturer: (firstName: string, lastName: string): number => {
    let id = db.lecturer.length + 1;
    db.lecturer.push({
      id,
      firstName,
      lastName,
    });
    return id;
  },
  updateLecturerById: (data: {
    id: number;
    firstName: string;
    lastName: string;
  }): boolean => {
    const { id, firstName, lastName } = data;
    let index = db.lecturer.findIndex((element) => element.id === id);
    if (index >= 0) {
      db.lecturer[index].firstName = firstName;
      db.lecturer[index].lastName = lastName;
      return true;
    } else {
      return false;
    }
  },
};

export default lecturerService;
