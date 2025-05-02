import { connection } from "../database/knex/index.js";

export class MovieNotesController {
  async index(request, response) {
    const { user_id } = request.params;
    let notes;

    notes = await connection("movie_notes")
      .select("id", "title", "description", "rating")
      .where({ user_id })
      .orderBy("title");

    return response.json(notes);
  }
}
