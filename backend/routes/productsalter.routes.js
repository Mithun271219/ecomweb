const route = require('express').Router();

const { postproducts } = require('../services/productsAlter.services');

route.post('/insertmany', postproducts);

module.exports = route;