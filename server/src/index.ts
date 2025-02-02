import express from "express";
import { projects } from "./routes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions)).use("/projects", projects);

export const server = app;
