import { connection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import { hash, compare } from "bcryptjs";

export class UsersController {
  async index(request, response) {
    const users = await connection("users");
    return response.json(users);
  }

  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await connection("users").where({ email });

    if (checkUserExists.length > 0) {
      throw new AppError("This email is already in use");
    }

    const hashedPassword = await hash(password, 8);

    await connection("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json({});
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await connection("users").where({ id }).first();

    response.json(user);
  }
}
