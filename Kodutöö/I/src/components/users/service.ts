import db from "../../db";
import { NewUser, UpdateUser, User } from "./interfaces";
import hashService from "../general/services/hashService";

const userService = {
  getAllUsers: (): User[] => {
    const { users } = db;
    return users;
  },
  getUserById: (id: number): User | undefined => {
    const user = db.users.find((element) => element.id === id);
    return user;
  },
  getUserByEmail: (email: string): User | undefined => {
    const user = db.users.find((element) => element.email === email);
    return user;
  },
  createUser: async (newUser: NewUser) => {
    const id = db.users.length + 1;
    const hashPassword = await hashService.hash(newUser.password);
    db.users.push({
      id,
      ...newUser,
      password: hashPassword,
    });
    return id;
  },
  updateUserById: (user: UpdateUser): boolean => {
    const { id, firstName, lastName, email, password, role } = user;
    let index = db.users.findIndex((element) => element.id === id);
    if (index < 0) {
      return false;
    }
    if (firstName) {
      db.users[index].firstName = firstName;
    }
    if (lastName) {
      db.users[index].lastName = lastName;
    }
    if (password) {
      db.users[index].password = password;
    }
    if (email) {
      db.users[index].email = email;
    }
    if (role) {
      db.users[index].role = role;
    }
    return true;
  },
  deleteUser: (id: number): boolean => {
    const index = db.users.findIndex((element) => element.id === id);
    db.users.splice(index, 1);
    return true;
  },
};

export default userService;
