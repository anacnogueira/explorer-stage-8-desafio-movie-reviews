import { connection } from "../database/knex/index.js";

export class MovieNotesController {
  async index(request, response) {
    const { user_id } = request.params;
    const { title, tags } = request.query;

    const notes = await connection("movie_notes")
      .select(
        "movie_notes.id",
        "movie_notes.title",
        "movie_notes.description",
        "movie_notes.rating"
      )
      .where("movie_notes.user_id", user_id)
      .orderBy("movie_notes.title")
      .modify(function (queryBuilder) {
        if (title) {
          queryBuilder.whereLike("movie_notes.title", `%${title}%`);
        }

        if (tags) {
          const filterTags = tags.split(",").map((tag) => tag.trim());
          queryBuilder
            .innerJoin("movie_tags", "movie_tags.note_id", "movie_notes.id")
            .whereIn("movie_tags.name", filterTags);
        }
      });

    const userTags = await connection("movie_tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id == note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
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
