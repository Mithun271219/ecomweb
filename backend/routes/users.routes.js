const route = require('express').Router();

const { getAllUsers, getusername, resetPassword } = require('../services/users.services');

route.get('/', getAllUsers);
route.post('/username', getusername);
route.put('/reset/password/:username', resetPassword);

module.exports = route;
