import { Router } from "express";
import { userRoutes } from "./users.routes.js";
import { movieNotesRoutes } from "./movie-notes.routes.js";
import { movieTagsRoutes } from "./movie-tags.routes.js";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/movie-notes", movieNotesRoutes);
routes.use("/movie-tags", movieTagsRoutes);
