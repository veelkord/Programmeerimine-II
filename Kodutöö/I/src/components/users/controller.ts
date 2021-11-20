import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import { NewUser, UpdateUser } from "./interfaces";
import userService from "./service";

const userController = {
  getAllUsers: (req: Request, res: Response) => {
    const users = userService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const user = userService.getUserById(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (id === res.locals.user.id || res.locals.user.role === "Admin") {
      if (!user) {
        return res.status(responseCodes.badRequest).json({
          error: `No user found with id: ${id}`,
        });
      }
      return res.status(responseCodes.ok).json({
        user,
      });
    }
    return res.status(responseCodes.badRequest).json({
      error: `You have no permission for this`,
    });
  },
  deleteUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const userExists = userService.getUserById(id);
    if (!userExists) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    }
    userService.deleteUser(id);
    return res.status(responseCodes.noContent).send();
  },

  addUser: async (req: Request, res: Response) => {
    const { firstName, lastName, password, email } = req.body;
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
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: "Password is required",
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: "Email is required",
      });
    }
    const newUser: NewUser = {
      firstName,
      lastName,
      password,
      email,
      role: "User",
    };
    const id = await userService.createUser(newUser);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUserById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName, email, password } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!firstName && !lastName && !email && !password) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to Update",
      });
    }
    const updateUser: UpdateUser = {
      id,
      firstName,
      lastName,
      email,
      password,
    };
    const userExists = userService.updateUserById(updateUser);
    if (!userExists) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    return res.status(responseCodes.noContent).send();
  },
};

export default userController;
