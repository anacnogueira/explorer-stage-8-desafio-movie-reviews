/**
 * @param {import("knex").Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("name");
    table.text("email");
    table.text("password");
    table.text("avatar");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
}

/**
 * @param {import("knex").Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("users");
}
