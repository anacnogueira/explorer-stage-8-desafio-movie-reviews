import { connection } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import { hash, compare } from "bcryptjs";
import knex from "knex";

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

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password, old_password, avatar } = request.body;

    const user = await connection("users").where({ id }).first();
    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await connection("users")
      .where({ email })
      .first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("This email is already in use.");
    }

    if (password && !old_password) {
      throw new AppError(
        "You need to enter the old password to set the new password."
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("The old password does not match.");
      }

      user.password = await hash(password, 8);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.avatar = avatar ?? user.avatar;
    const updated_at = connection.fn.now();

    await connection("users").where({ id }).update({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      updated_at,
    });

    response.json({});
  }
}
