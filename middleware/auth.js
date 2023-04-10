import { Unauthorized } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthorized("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new Unauthorized("Authentication Invalid");
  }
};

export default authenticateUser;
