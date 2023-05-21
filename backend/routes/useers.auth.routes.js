const route = require('express').Router();

const { signIn, signUp } = require('../services/users.auth.services');

route.post('/users/signin', signIn);
route.post('/users/signup', signUp);

module.exports = route;