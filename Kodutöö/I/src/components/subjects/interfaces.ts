// Interfaces

interface Subject {
  id: number;
  lecturerId: number;
  courseId: number;
  subject: string;
  scheduled: string;
}

interface SubjectData {
  lecturerId: number;
  courseId: number;
  subject: string;
  scheduled: string;
}

export { Subject, SubjectData };
