import { connection } from "../database/knex/index.js";

export class UsersController {
  async index(request, response) {
    let users = await connection("users");

    response.json(users);
  }
}
