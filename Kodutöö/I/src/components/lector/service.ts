import db from "../../db";
import Course from "../course/interfaces";
import Lector from "./interfaces";

const lecturerService = {
  getLecturerById: (id: number): Lector | undefined => {
    const lecturer = db.lecturer.find((element) => element.id === id);
    return lecturer;
  },

  getCourseById: (id: number): Course[] => {
    const courses = db.courses.filter((element) => element.lecturerId === id);
    return courses;
  },
  getLecturerIndex: (id: number): number => {
    const index = db.lecturer.findIndex((element) => element.id === id);
    return index;
  },
  deleteLecturerById: (id: number): boolean => {
    const index = db.courses.findIndex((element) => element.lecturerId === id);
    console.log(index);
    if (index >= 0) {
      return true;
    } else {
      db.lecturer.splice(index, 1);
      return false;
    }
  },
  createlecturerAndHisCourses: (
    firstName: string,
    lastName: string,
    semester: number,
    course: string,
    scheduled: string
  ): number => {
    let id = db.lecturer.length + 1;
    const lecturerId = id;
    db.lecturer.push({
      id,
      firstName,
      lastName,
    });

    id = db.courses.length + 1;
    db.courses.push({
      id,
      lecturerId,
      semester,
      course,
      scheduled,
    });
    return id;
  },
};

export default lecturerService;
