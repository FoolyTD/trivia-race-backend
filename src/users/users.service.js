const knex = require("../db/connection");

function list() {
    return knex("users").select("*")
}

function read(user_id) {
    return knex("users")
    .where({user_id})
}

function create(user) {
    return knex("users")
    .insert(user)
    .returning("*")
}

module.exports = {
    list,
    create,
    read
}