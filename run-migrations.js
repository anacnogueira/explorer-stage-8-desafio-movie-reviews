import knexConfig from "./knexfile.js";
import knex from "knex";

const db = knex(knexConfig.development);

db.migrate
  .latest()
  .then(() => {
    console.log("✅ Migrations executadas com sucesso.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erro ao executar as migrations:", error);
    process.exit(1);
  });
