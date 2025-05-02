import { Router } from "express";
import { MovieTagsController } from "../controllers/MovieTagsController.js";

export const movieTagsRoutes = Router();

const movieTagController = new MovieTagsController();

movieTagsRoutes.get("/:user_id", movieTagController.index);
