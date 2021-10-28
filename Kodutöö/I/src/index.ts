import express, { Request, Response, Application } from "express"; // import express
import lecturerController from "./components/lector/controller";
import courseController from "./components/course/controller";

const app: Application = express(); // create express app

app.use(express.json()); // For creating body object inside middleware request object

const port: number = 3000; // Port number, where API works

// Tunniplaani API-d

app.get("/lecturer/:id", lecturerController.getLecturerAndHisCoursesById);

app.delete("/lecturer/:id", lecturerController.deleteLecturerWhenNoCoursesById);

app.post("/lecturer", lecturerController.addLecturerAndHisCourses);

app.patch("/courses/:id", courseController.updateCourseById);

// Paneme API käima
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
