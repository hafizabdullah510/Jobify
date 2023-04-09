import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

// import connectDB from "./db/connect.js";
import Connection from "./Db/db.js";
import Job from "./model/Job.js";

const start = async () => {
  try {
    await Connection(process.env.password);

    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
