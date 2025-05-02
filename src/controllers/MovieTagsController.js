import { connection } from "../database/knex/index.js";

export class MovieTagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await connection("movie_tags").where({ user_id });

    return response.json(tags);
  }
}
