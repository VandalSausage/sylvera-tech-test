import express from "express";
import { query } from "../../conn";
import { PoolConnection } from "better-sqlite-pool";

export const projects = express.Router();

// TODO create a shared types package
interface Project {
  id: string;
  url: string;
  status: "Under development" | "Under validation" | "Registration requested";
  country: string | null;
}

const getAllProjects = (db: PoolConnection): Project[] =>
  db.prepare("SELECT * FROM projects").all() as Project[];

projects.get("/", async (request, response) => {
  try {
    response.appendHeader("Content-Type", "application/json");
    const resp = await query(getAllProjects);
    response.status(200).json(resp);
  } catch (e) {
    console.error(e);
    response.status(500).json({
      message: "something went wrong",
    });
  }
});
