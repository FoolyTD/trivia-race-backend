const knex = require("../db/connection");

function list() {
    return knex("leaderboards").select("*")
}

function create(newEntry) {
    return knex("leaderboards")
    .insert(newEntry)
    .returning("*")
}

module.exports = {
    list,
    create
}