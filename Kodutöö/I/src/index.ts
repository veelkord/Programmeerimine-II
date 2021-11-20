import express, { Request, Response, Application } from "express"; // import express
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json";
import cors from "cors";
import authController from "./components/auth/controller";
import userController from "./components/users/controller";
import lecturerController from "./components/lector/controller";
import subjectController from "./components/subjects/controller";
import courseController from "./components/course/controller";
import roomController from "./components/room/controller";
// import middlewares
import isAdmin from "./components/auth/isAdminMiddleware";
import isLoggedIn from "./components/auth/isLoggedInMiddleware";
import checkAlphabet from "./components/general/middleware/checkLetterMiddleware";
import checkAlphabetAndNumber from "./components/general/middleware/checkLetterAndNumberMiddleware";

const app: Application = express(); // create express app
app.use(cors()); //use cors
app.use(express.json()); // For creating body object inside middleware request object
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

const port: number = 3000; // Port number, where API works

// Schedule API

// Login

app.post("/login", authController.login);

// User endpoints
app.post(
  "/users",
  checkAlphabet,
  checkAlphabetAndNumber,
  userController.addUser
);
// login middelware from this point
app.use(isLoggedIn);
//-------
app.get("/users", isAdmin, userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.delete("/users/:id", userController.deleteUser);
app.patch("/users/:id", checkAlphabet, userController.updateUserById);

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
