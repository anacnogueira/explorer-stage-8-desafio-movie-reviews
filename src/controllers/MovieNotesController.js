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

  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const [note_id] = await connection("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await connection("movie_tags").insert(tagsInsert);

    response.json();
  }
}
