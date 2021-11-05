import express, { Request, Response, Application } from "express"; // import express
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json";
import cors from "cors";
import lecturerController from "./components/lector/controller";
import subjectController from "./components/subjects/controller";
import courseController from "./components/course/controller";
import roomController from "./components/room/controller";
import checkAlphabet from "./components/general/middleware/checkLetterMiddleware";
import checkAlphabetAndNumber from "./components/general/middleware/checkLetterAndNumberMiddleware";
import subjectServices from "./components/subjects/service";

const app: Application = express(); // create express app
app.use(cors()); //use cors
app.use(express.json()); // For creating body object inside middleware request object
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

const port: number = 3000; // Port number, where API works

// Schedule API

// Lecturer endpoints
app.get("/lecturer/:id", lecturerController.getLecturerById);
app.post(
  "/lecturer",
  checkAlphabet,
  checkAlphabetAndNumber,
  lecturerController.addLecturer
);
app.delete(
  "/lecturer/:id",
  lecturerController.deleteLecturerWhenNoSubjectsById
);
app.patch(
  "/lecturer/:id",
  checkAlphabet,
  lecturerController.updateLecturerById
);

// Subjects endpoints
app.get("/subject/:id", subjectController.getSubjectById);
app.post("/subject", subjectController.addSubject);
app.delete("/subject/:id", subjectController.deleteSubject);
app.patch("/subject/:id", subjectController.updateSubjectById);

// Course endpoints

app.get("/course/:id", courseController.getCourseById);
app.post("/course", courseController.addCourse);
app.delete("/course/:id", courseController.deleteCourse);
app.patch("/course/:id", courseController.updateCourseById);

// Room endpoints

app.get("/room/:id", roomController.getRoomById);
app.post("/room", roomController.addRoom);
app.delete("/room/:id", roomController.deleteRoom);
app.patch("/room/:id", roomController.updateRoomById);

// Start API
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
