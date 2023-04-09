import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// Do not need to use cors if using proxy on front-end (import cors from 'cors')
import Connection from "./Db/db.js";
import notFound from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import authenticateUser from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//static assets
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(_dirname, "./client/build")));

// ENV VAR
dotenv.config();
const password = process.env.password;
const PORT = process.env.PORT;

//Api Routes
app.get("/api/v1", (req, res) => {
  res.json({ msg: "Home Route" });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticateUser, jobRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "./client/build", "index.html"));
});

//Error Routes
app.use(notFound);
app.use(errorHandlerMiddleware);

//Database Connection
const start = async () => {
  try {
    await Connection(password);
    app.listen(PORT, () =>
      console.log(`Server is listening at PORT : ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
