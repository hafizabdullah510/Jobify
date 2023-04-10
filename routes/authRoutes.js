import express from "express";

const routes = express.Router();
import authenticateUser from "../middleware/auth.js";
import rateLimiter from "express-rate-limit";

const apiLimit = rateLimiter({
  windowMs: 1000 * 60 * 15,
  max: 10,
  message: "Too many requests! please try again after 15 minutes",
});

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";

routes.post("/register", apiLimit, register);
routes.post("/login", apiLimit, login);
routes.patch("/updateUser", authenticateUser, updateUser);
routes.get("/getCurrentUser", authenticateUser, getCurrentUser);
routes.get("/logout", logoutUser);

export default routes;
