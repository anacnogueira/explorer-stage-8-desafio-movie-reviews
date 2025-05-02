import { Router } from "express";
import { UsersController } from "../controllers/UsersController.js";

export const userRoutes = Router();

const userController = new UsersController();

userRoutes.get("/", userController.index);
userRoutes.post("/", userController.create);
userRoutes.get("/:id", userController.show);
userRoutes.put("/:id", userController.update);
