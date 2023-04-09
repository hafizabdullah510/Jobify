import express from "express";

const routes = express.Router();
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  showStats,
} from "../controllers/jobsController.js";

routes.post("/", createJob);
routes.get("/", getAllJobs);
routes.patch("/:id", updateJob);
routes.get("/stats", showStats);

routes.delete("/:id", deleteJob);

export default routes;
