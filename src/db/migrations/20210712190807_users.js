
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("user_name").unique();
        table.string("password");
        table.string("email");
        table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
