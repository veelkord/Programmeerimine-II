import { ElementFlags } from "typescript";
import db from "../../db";
import Course from "./interface";

const courseService = {
  getCourseyId: (id: number): Course | undefined => {
    const course = db.courses.find((element) => element.id === id);
    return course;
  },
  createCourse: (course: string): number => {
    let id = db.courses.length + 1;
    db.courses.push({ id, course });
    return id;
  },
  deleteCourse: (id: number): boolean => {
    const index = db.courses.findIndex((element) => element.id === id);
    if (index <= 0) {
      return true;
    } else {
      const subjectExists = db.subjects.find(
        (element) => element.courseId === id
      );
      if (subjectExists) {
        return true;
      } else {
        db.courses.splice(index, 1);
        return false;
      }
    }
  },
  updateCourse: (data: { id: number; course: string }): boolean => {
    const { id, course } = data;
    let index = db.courses.findIndex((element) => element.id === id);
    if (index >= 0) {
      db.courses[index].course = course;
      return true;
    } else {
      return false;
    }
  },
};

export default courseService;
