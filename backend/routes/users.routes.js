const route = require('express').Router();

const { getAllUsers, getusername, resetPassword, validateOTP } = require('../services/users.services');

route.get('/', getAllUsers);
route.post('/username', getusername);
route.post('/otpvalidation/:username', validateOTP);
route.put('/reset/password/:username', resetPassword);

module.exports = route;
