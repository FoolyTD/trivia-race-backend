const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./users.service");
// require bcrypt library npm package documentation: https://www.npmjs.com/package/bcrypt
const bcrypt = require("bcrypt");

async function userExists(req, res, next) {
  const user_id = req.params.userId;

  const data = await service.read(user_id);

  if (data === undefined) {
    return next({
      status: 400,
      message: `user with id: ${user_id} not found`,
    });
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
      message: "request body is missing data object",
    });
  }
  for (let key in data) {
    if (!VALID_FIELDS.includes(key)) {
      return next({
        status: 404,
        message:
          "One or more fields is invalid. 'user_name, 'password, and 'email' required",
      });
    }
  }
  res.locals.user = data;
  next();
}

async function login(req, res, next) {
  // from the request body, deconstruct the user name and password
  const { data = {} } = req.body;
  const { user_name, password } = data;
  const foundUser = await service.readName(user_name);
  console.log(password);
  console.log(foundUser.password);

  if (foundUser === undefined) {
    return next({
      status: 400,
      message: "user not found",
    });
  }
  if (password == foundUser.password) {
    const response = { user_id: foundUser.user_id, user_name };
    res.status(200).json({ data: response });
  } else {
    next({
      status: 400,
      message: "invalid password",
    });
  }
}

async function list(___, res, ___) {
  const data = await service.list();
  res.json({ data });
}

async function read(___, res, ___) {
  res.json({ data: res.locals.user });
}

async function create(___, res, ___) {
  const { user } = res.locals;

  const data = await service.create(user);

  res.json({ data });
}

async function update(req,res,next) {
  const { user } = res.locals;
  const foundUser = await service.readName(user.user_name);
  const updatedUser = {
    ...foundUser,
    ...user
  }
  const data = await service.update(updatedUser);
  res.json({ data });
}

async function destroy(req,res,next) {
  const data = await service.destroy(res.locals.user.user_id);
  res.sendStatus(204);
}

module.exports = {
  create: [isValidUser, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
  login: [asyncErrorBoundary(login)],
  list: [asyncErrorBoundary(list)],
  update: [isValidUser, asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(userExists),asyncErrorBoundary(destroy)]
};
