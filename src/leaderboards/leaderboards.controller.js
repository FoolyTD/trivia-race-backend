const service = require("./leaderboards.service");
const usersService = require("../users/users.service");

function isValidEntry(req,res,next) {
    const { data } = req.body;
    const VALID_FIELDS = ['user_id', 'score'];

    if (data === undefined) {
        return next({
            status:400,
            message: `missing data in request`
        });
    }
    if (data.user_id === undefined || data.score === undefined/* || data.player_name.match(/[0-9]/) */) {
        return next({
            status:400,
            message: `missing data field(s). 'user_id & 'score' are required`
        });
    } 
    // if (data.score === undefined /* || data.score.match(/[^0-9]/) */) {
    //     return next({
    //         status:400,
    //         message: `missing score, or invalid score`
    //     });
    // }
    for (let key in data) {
        if (!VALID_FIELDS.includes(key)) {
            return next({
                status: 404,
                message: `${key} is not a valid field`
            });
        }
    }

    res.locals.entry = data;
    next();
}

async function playerExists(req,res,next) {
    const { user_id } = res.locals.entry;
    const user = await usersService.read(user_id);

    if (user === undefined) {
        return next({
            status: 404,
            message: "user does not exist"
        })
    }
    res.locals.entry.user_name = user[0].user_name;
    next();
}

async function list(req,res,next) {
    const data = await service.list();
    res.json({data});
}

async function create(req,res,next) {
    const { entry } = res.locals;
    console.log(entry);
    const data = await service.create(entry);

    res.json({data});
}

module.exports = {
    list,
    create: [isValidEntry, playerExists, create],
};