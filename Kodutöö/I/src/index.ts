import express, { Request, Response, Application } from "express"; // import express
import { request } from "http";

const app: Application = express(); // create express app

app.use(express.json()); // For creating body object inside middleware request object

const port: number = 3000; // Port number, where API works

// Http response codes
const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};
interface Lecor {
  id: number;
  firstName: string;
  lastName: string;
}
interface Course {
  id: number;
  lecturerId: number;
  semester: number;
  course: string;
  scheduled: string;
}
interface Db {
  lecturer: Lecor[];
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

// Konkreetne õppejõud ja tema antavad ained

app.get("/lecturer/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const lecturer = db.lecturer.find((element) => element.id === id);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  if (!lecturer) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id: ${id}`,
    });
  } else {
    const courses = db.courses.filter((element) => element.lecturerId === id);
    return res.status(responseCodes.ok).json({
      lecturer,
      courses,
    });
  }
});

// Õppejõu kustutamine ainult siis kui tal antavaid ained pole.

app.delete("/lecturer/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  const index = db.lecturer.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `User not found with id: ${id}`,
    });
  } else {
    const index2 = db.courses.find((element) => element.lecturerId === id);
    console.log(index2);
    if (!index2) {
      db.lecturer.splice(index, 1);
      return res.status(responseCodes.noContent).send();
    } else {
      return res.status(responseCodes.badRequest).json({
        error: "Lecturer has active courses!",
      });
    }
  }
});

// Uue Õppejõu lisamine koos aine/ainetega - ained on kohtustulikud

app.post("/lecturer", (req: Request, res: Response) => {
  const { firstName, lastName, semester, course, scheduled } = req.body;
  if (!firstName) {
    return res.status(responseCodes.badRequest).json({
      error: "First name is required",
    });
  }
  if (!lastName) {
    return res.status(responseCodes.badRequest).json({
      error: "Last name is required",
    });
  }
  if (!course) {
    return res.status(responseCodes.badRequest).json({
      error: "Course is required",
    });
  } else {
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
    return res.status(responseCodes.created).json({
      id,
    });
  }
});
//   Õppecourse andmete uuendamine, muudame semestrit ja toimumis aega

app.patch("/courses/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { semester, scheduled } = req.body;
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: "No valid id provided",
    });
  }
  if (!semester && !scheduled) {
    return res.status(responseCodes.badRequest).json({
      error: "Nothing to update",
    });
  }
  const index = db.courses.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id: ${id}`,
    });
  }
  if (semester) {
    db.courses[index].semester = parseInt(semester, 10);
  }
  if (scheduled) {
    db.courses[index].scheduled = scheduled;
  }
  return res.status(responseCodes.noContent).send();
});

// Paneme API käima
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
