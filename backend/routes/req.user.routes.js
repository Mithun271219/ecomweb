const route = require('express').Router();

const { getUserinfoOnReq, addtocart, removefromCart, alterQuantity, changePassword, getusername } = require('../services/users.services');

route.get('/', getUserinfoOnReq);
route.put('/addtocart', addtocart);
route.put('/removefromcart', removefromCart);
route.put('/alterquantity', alterQuantity);
route.put('/auth/reset/password', changePassword);

module.exports = route;