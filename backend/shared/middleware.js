const jwt = require('jsonwebtoken');

module.exports = {
    async logging(req, res, next) {
        console.log(new Date().toLocaleString(), req.method, req.url);
        next();
    },

    async tokenValidtion(req, res, next) {
        try {
            // const token = req.headers.authorization.split(' ')[1];
            // const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // req.user = decoded;
            // next();
            if (!req.headers && !req.headers.authorization) {
                return res.status(403).json({ message: "user is not uthorizes 1" })
            }
            const [tokenType, token] = req.headers.authorization.split(' ');
            if (tokenType !== 'Bearer' && !token) {
                return res.status(403).json({ message: "user is not uthorizes 2" })
            }
            try {
                req.user = jwt.verify(token, process.env.jwtkey);
                next();
            } catch (error) {
                console.log(error)
                return res.status(403).json({ message: "user is not uthorizes 3" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "error getting user information" })
        }
    }
}