import Lector from "./components/lector/interfaces";
import { Subject } from "./components/subjects/interfaces";
import Course from "./components/course/interface";
import Room from "./components/room/interface";
// Interfaces

interface Db {
  lecturer: Lector[];
  subjects: Subject[];
  courses: Course[];
  rooms: Room[];
}

// Dummy database

const db: Db = {
  lecturer: [
    {
      id: 1,
      firstName: "Martti",
      lastName: "Raavel",
    },
    {
      id: 2,
      firstName: "Laura",
      lastName: "Hein",
    },
    {
      id: 3,
      firstName: "Hans",
      lastName: "Solo",
    },
  ],
  subjects: [
    {
      id: 1,
      lecturerId: 1,
      courseId: 2,
      subject: "Programmeerimine II",
      scheduled:
        "Neljapäev, 30.09.2021  14:15-17:30, Laupäev 13.11.2021 14:15-17:30",
    },
    {
      id: 2,
      lecturerId: 1,
      courseId: 1,
      subject: "Riistvara ja operatsioonisüsteemide alused",
      scheduled:
        "Reede, 08.10.2021  14:15-17:30,Neljapäev 21.10.2021 10:00-13:15",
    },
    {
      id: 3,
      lecturerId: 2,
      courseId: 1,
      subject: "Kujundusgraafika",
      scheduled:
        "Neljapäev, 07.10.2021  14:15-17:30, Reede 22.10.2021 10:00-13:15",
    },
    {
      id: 4,
      lecturerId: 2,
      courseId: 2,
      subject: "Kujundusgraafika II",
      scheduled:
        "Reede, 01.10.2021  14:15-17:30, Laupäev 16.10.2021 14:15-17:30",
    },
  ],
  courses: [
    {
      id: 1,
      course: "RIF 1",
    },
    {
      id: 2,
      course: "RIF 2",
    },
  ],
  rooms: [
    {
      id: 1,
      room: "Arvutilabor 203",
    },
    {
      id: 2,
      room: "Arvutilabor 205",
    },
  ],
};

export default db;
