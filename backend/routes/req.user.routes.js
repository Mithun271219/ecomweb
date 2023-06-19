const route = require('express').Router();

const { getUserinfoOnReq, addtocart, removefromCart, alterQuantity, changePassword, getusername, confirmOrder } = require('../services/users.services');

route.get('/', getUserinfoOnReq);
route.put('/addtocart', addtocart);
route.put('/removefromcart', removefromCart);
route.put('/alterquantity', alterQuantity);
route.put('/confirmorder', confirmOrder);
route.put('/auth/reset/password', changePassword);

module.exports = route;