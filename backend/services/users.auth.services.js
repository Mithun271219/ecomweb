const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs')
const { signInSchema, signUpSchema, validate } = require('../shared/schema');

module.exports = {
    async signIn(req, res) {
        try {
            const { username, password } = req.body;
            // validation
            let isError = await validate(signInSchema, req.body)
            if (isError) {
                return res.status(400).json({ message: isError })
            }

            //user exist or not
            const user = await this.users.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: "username or password incorrect" })
            }

            //password validation
            let isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                return res.status(401).json({ message: "username or password incorrect" })
            }

            //tokem generation and response
            let token = jwt.sign({ _id: user._id }, process.env.jwtkey, { expiresIn: process.env.jwtexpiery })
            res.json({ message: "signIn success", token })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while signing In!.." })
        }
    },

    async signUp(req, res) {
        try {
            // validation
            let isError = await validate(signUpSchema, req.body);
            if (isError) {
                return res.status(400).json({ message: isError });
            }

            //password encryption
            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
            delete req.body.cpassword;

            //posting user
            await this.users.insertOne({ ...req.body, timeStamp: new Date().toLocaleString() });
            res.json({ message: "user registeration success" })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while signing up" })
        }
    }
}