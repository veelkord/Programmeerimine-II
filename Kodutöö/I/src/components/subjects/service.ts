import db from "../../db";
import { Subject, SubjectData } from "./interfaces";

const subjectServices = {
  getSubjectById: (id: number): Subject | undefined => {
    const subject = db.subjects.find((element) => element.id === id);
    return subject;
  },
  createSubject: (subjectData: SubjectData): number => {
    let id = db.subjects.length + 1;
    db.subjects.push({ id, ...subjectData });
    return id;
  },
  deleteSubject: (id: number): boolean => {
    const index = db.subjects.findIndex((element) => element.id === id);
    db.subjects.splice(index, 1);
    return true;
  },
  updateSubjectById: (data: {
    id: number;
    courseId?: string;
    scheduled?: string;
  }): boolean => {
    const { id, courseId, scheduled } = data;
    let index = db.subjects.findIndex((element) => element.id === id);
    if (index >= 0) {
      if (courseId) {
        db.subjects[index].courseId = parseInt(courseId, 10);
      }
      if (scheduled) {
        db.subjects[index].scheduled = scheduled;
      }
      return true;
    } else {
      return false;
    }
  },
};

export default subjectServices;
