const route = require('express').Router();

const { getAllProducts, getproductbyid, getProductsByCategory } = require('../services/products.services');

route.get('/', getAllProducts);
route.get('/getbyid/:id', getproductbyid);
route.get('/category', getProductsByCategory);

module.exports = route;