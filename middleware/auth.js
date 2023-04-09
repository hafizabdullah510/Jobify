import { Unauthorized } from "../errors/index.js";
import jwt from "jsonwebtoken";
const authenticateUser = async (req, res, next) => {
  const authUser = req.headers.authorization;
  if (!authUser || !authUser.startsWith("Bearer")) {
    throw new Unauthorized("Authentication Invalid");
  }

  const token = authUser.split(" ")[1];
  console.log(token);

  try {
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new Unauthorized("Authentication Invalid");
  }
};

export default authenticateUser;
