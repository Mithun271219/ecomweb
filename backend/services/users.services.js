const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const { sendMail } = require('../shared/nodeMailer');
const otpgen = require('otp-generator');
const { date } = require('joi');

module.exports = {
    async getAllUsers(req, res) {
        try {
            let data = await this.users.find().toArray();
            res.json(data);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'error getting users data' })
        }
    },
    async registerUser(req, res) {
        try {
            await this.users.insertOne(req.body);
            res.json({ message: "Account Created Successfully" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'error while registering user' })
        }
    },
    async getUserinfoOnReq(req, res) {
        try {
            // let id = new ObjectId(req.user._id)
            let requser = await this.users.findOne({ _id: new ObjectId(req.user._id) });
            res.json(requser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error while getting user information' });
        }
    },
    async changePassword(req, res) {
        try {
            let id = new ObjectId(req.user._id);
            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
            delete req.body.cpassword
            await this.users.findOneAndUpdate({ _id: id }, { $set: { password: req.body.password, timeStamp: new Date().toLocaleString() } });
            res.json({ message: "pssword changed!." })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while changing password" })
        }
    },
    async addtocart(req, res) {
        try {
            let id = new ObjectId(req.user._id);
            await this.users.findOneAndUpdate({ _id: id }, { $push: { cart: req.body } })
            res.json({ message: "item added success" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error while updating cart' });
        }
    },
    async removefromCart(req, res) {
        try {
            let id = new ObjectId(req.user._id);
            await this.users.findOneAndUpdate({ _id: id }, { $pull: { cart: { id: Number(req.body.id) } } })
            res.json({ message: "product removed from cart" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error while removing item from cart' });
        }
    },
    async updateOrderHistory(req, res) {
        try {
            let id = new ObjectId(req.user._id);
            await this.users.findOneAndUpdate({ id: _id }, { $set: { orderhistory: { ...orderHistory, cart } } })
            res.json({ message: "orderhistory updated" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error while fetching order history' });
        }
    },
    async confirmOrder(req, res) {
        try {
            let id = new ObjectId(req.user._id);
            await this.users.findOneAndUpdate({ _id: id }, { $set: { cart: [] } });
            res.json({ message: "Ored-Confirmed" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error while checking Out your Order' });
        }
    },
    async alterQuantity(req, res) {
        try {
            let id = new ObjectId(req.user._id);
            await this.users.findOneAndUpdate(
                { _id: id, "cart.id": req.body.id },
                { $set: { "cart.$.quantity": Number(req.body.quantity) } },
                { new: true });
            res.json({ message: 'quantity altered' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error while altering quantity' });
        }
    },

    //this is part of password reset
    async getusername(req, res) {
        const OneTimePass = otpgen.generate(4, { digits: true, specialChars: false, upperCaseAlphabets: false, lowerCaseAlphabets: false })

        try {
            let data = await this.users.findOne({ username: req.body.username });
            if (data) {
                await sendMail(data.email, data.firstName, OneTimePass, async (error, info) => {
                    if (error) {
                        console.log('error is ', error)
                        res.status(500).json({ error: 'Failed to send OTP email' });
                    } else {
                        let isUser = await this.OneTimePass.findOne({ username: data.username })
                        if (isUser) {
                            await this.OneTimePass.findOneAndUpdate({ username: isUser.username }, { $set: { otp: OneTimePass, timeStamp: new Date().toLocaleString() } })
                            res.json({ username: data.username, message: 'OTP sent successfully' });
                        } else {
                            await this.OneTimePass.insertOne({ username: data.username, otp: OneTimePass, timeStamp: new Date().toLocaleString() })
                            res.json({ username: data.username, message: 'OTP sent successfully' });
                        }
                    }
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'username not exist' });
        }
    },

    async validateOTP(req, res) {
        try {
            let isValidOTP = await this.OneTimePass.findOne({ username: req.params.username, otp: req.body.otp });
            if (isValidOTP) {
                res.json({ message: "OTP is valid", OTPValidation: true })
            } else {
                res.status(400).json({ message: "Invalid OTP" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'error validating the OTP' });
        }
    },

    async resetPassword(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
            delete req.body.cpassword
            // await this.users.findOneAndUpdate({ username: req.params.username }, { $set: { password: req.body.password, timeStamp: new Date().toLocaleString() } });
            // res.json({ message: "pssword changed!." })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while resetting password" })
        }
    },
}                               