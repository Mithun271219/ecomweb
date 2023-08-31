const express = require('express');
const dotenv = require('dotenv');
const cros = require('cors');

const { connect } = require('./shared/mongo');
const getallproducts = require('./routes/products.routes');
const middleware = require('./shared/middleware');
const productAlter = require('./routes/productsalter.routes');
const users = require('./routes/users.routes');
const Auth = require('./routes/useers.auth.routes');
const { tokenValidtion } = require('./shared/middleware');
const getuseronreq = require('./routes/req.user.routes');

const app = express();
dotenv.config();

(() => {
    //db connection
    connect();

    //cross origin resource sharing
    app.use(cros());
    app.use(express.json());

    //middleware
    app.use(middleware.logging)

    app.use('/products', getallproducts);
    app.use('/auth', Auth);

    app.use('/users', users);

    //need jwt verify
    app.use(tokenValidtion)
    app.use('/user', getuseronreq);
    app.use('/products', productAlter);


    app.listen(process.env.port, () => console.log(`server listenign to port ${process.env.port}`))
})()



