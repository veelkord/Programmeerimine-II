import Lector from "./components/lector/interfaces";
import Course from "./components/course/interfaces";
// Interfaces

interface Db {
  lecturer: Lector[];
  courses: Course[];
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
  courses: [
    {
      id: 1,
      lecturerId: 1,
      semester: 2,
      course: "Programmeerimine II",
      scheduled:
        "Neljapäev, 30.09.2021  14:15-17:30, Laupäev 13.11.2021 14:15-17:30",
    },
    {
      id: 2,
      lecturerId: 1,
      semester: 1,
      course: "Riistvara ja operatsioonisüsteemide alused",
      scheduled:
        "Reede, 08.10.2021  14:15-17:30,Neljapäev 21.10.2021 10:00-13:15",
    },
    {
      id: 3,
      lecturerId: 2,
      semester: 1,
      course: "Kujundusgraafika",
      scheduled:
        "Neljapäev, 07.10.2021  14:15-17:30, Reede 22.10.2021 10:00-13:15",
    },
    {
      id: 4,
      lecturerId: 2,
      semester: 2,
      course: "Kujundusgraafika II",
      scheduled:
        "Reede, 01.10.2021  14:15-17:30, Laupäev 16.10.2021 14:15-17:30",
    },
  ],
};

export default db;
