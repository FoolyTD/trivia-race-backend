
exports.up = function(knex) {
  return knex.schema.createTable("leaderboards", (table) => {
    table.integer("player_id").unsigned().notNullable();
    table
    .foreign("player_id")
    .references("user_id")
    .inTable("users")
    .onDelete("cascade");
    table.string("player_name").unsigned().notNullable();
    table
    .foreign("player_name")
    .references("user_name")
    .inTable("users")
    .onDelete("cascade");
    table.integer("score");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("leaderboards");
};
