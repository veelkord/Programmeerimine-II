import jwt from "jsonwebtoken";
import { User } from "../../users/interfaces";

const jwtPassword = "jagj9032jfKJKJgka903dsksfjsöd";

const jwtService = {
  sign: async (user: User) => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, jwtPassword, { expiresIn: "1h" });
    return token;
  },
  verify: async (token: string) => {
    try {
      const verify = await jwt.verify(token, jwtPassword);
      return verify;
    } catch {
      return false;
    }
  },
};

export default jwtService;
