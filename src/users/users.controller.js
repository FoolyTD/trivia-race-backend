const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./users.service");

async function userExists(req, res, next) {
    const user_id = req.params.userId;

    const data = await service.read(user_id);

    if (data === undefined) {
        return next({
            status: 400,
            message: `user with id: ${user_id} not found`
        })
    }

    res.locals.user = data;
    next();
}
function isValidUser(req, res, next) {
    const VALID_FIELDS = ["user_name", "password", "email"];
    const { data } = req.body;

    if (data === undefined) {
        return next({
            status: 404,
            message: "request body is missing data object"
        });
    }
    for (let key in data) {
        if (!VALID_FIELDS.includes(key)) {
            return next({
                status: 404,
                message: "One or more fields is invalid. 'user_name, 'password, and 'email' required"
            });
        }
    }
    res.locals.user = data;
    next();  
}

async function list(req,res,next) {
    const data = await service.list();
    res.json({data});
}

async function read(req,res,next) {
    res.json({data:res.locals.user});
}

async function create(req,res,next) {
    const { user } = res.locals;
    
    const data = await service.create(user);

    res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [asyncErrorBoundary(isValidUser), asyncErrorBoundary(create)],
    read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
};