import { Router } from "express";
import { MovieNotesController } from "../controllers/MovieNotesController.js";

export const movieNotesRoutes = Router();

const movieNoteController = new MovieNotesController();

movieNotesRoutes.get("/:user_id", movieNoteController.index);
movieNotesRoutes.post("/:user_id", movieNoteController.create);
movieNotesRoutes.get("/:user_id/:id", movieNoteController.show);
movieNotesRoutes.delete("/:user_id/:id", movieNoteController.delete);
