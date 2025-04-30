/**
 * @param {import("knex").Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("movie_notes", (table) => {
    table.increments("id").primary();
    table.text("title");
    table.text("description");
    table.integer("rating");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("movie_notes");
}
