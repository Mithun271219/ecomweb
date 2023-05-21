const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

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
    async getusername(req, res) {
        try {
            let data = await this.users.findOne({ username: req.body.username });
            res.json({ username: data.username })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'username not exist' });
        }
    },
    async resetPassword(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
            delete req.body.cpassword
            await this.users.findOneAndUpdate({ username: req.params.username }, { $set: { password: req.body.password, timeStamp: new Date().toLocaleString() } });
            res.json({ message: "pssword changed!." })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while resetting password" })
        }
    },
}                               