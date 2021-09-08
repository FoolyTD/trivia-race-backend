const knex = require("../db/connection");

function list() {
  return knex("users").select("user_name", "user_id", "email");
}

function read(user_id) {
  return knex("users")
    .select("user_name", "user_id")
    .where({ user_id })
    .first();
}

function readName(user_name) {
  return knex("users").where({ user_name }).first();
}

function create(user) {
  return knex("users").insert(user).returning("*");
}

function update(updatedUser) {
  return knex("users")
    .where({ user_id: updatedUser.user_id })
    .update(updatedUser)
    .returning("user_id");
}

function destroy(user_id) {
  return knex("users")
  .where({user_id})
  .del();
}

module.exports = {
  list,
  create,
  read,
  readName,
  update,
  destroy
};
