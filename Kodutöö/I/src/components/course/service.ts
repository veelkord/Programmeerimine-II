import db from "../../db";
import Course from "../course/interfaces";
import Lector from "./interfaces";

const courseServices = {
  updateCourseById: (data: {
    id: number;
    semester?: string;
    scheduled?: string;
  }): boolean => {
    const { id, semester, scheduled } = data;
    const index = db.courses.findIndex((element) => element.id === id);
    if (index) {
      if (semester) {
        db.courses[index].semester = parseInt(semester, 10);
      }
      if (scheduled) {
        db.courses[index].scheduled = scheduled;
      }
      return true;
    } else {
      return false;
    }
  },
};

export default courseServices;
