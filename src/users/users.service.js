const knex = require("../db/connection");

function list() {
    return knex("users").select("*")
}

function read(user_id) {
    return knex("users")
    .select("user_name","user_id")
    .where({user_id})
    .first()
}

function readName(user_name) {
    return knex("users")
    .where({user_name})
    .first()
}

function create(user) {
    return knex("users")
    .insert(user)
    .returning("*")
}

module.exports = {
    list,
    create,
    read,
    readName
}