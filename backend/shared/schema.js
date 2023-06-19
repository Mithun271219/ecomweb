const joi = require('joi');

module.exports = {
    signInSchema: joi.object({
        username: joi.string().min(3).max(9).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),

    signUpSchema: joi.object({
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3).required(),
        age: joi.number().required(),
        gender: joi.string().required(),
        email: joi.string().required(),
        phone: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
        cpassword: joi.ref('password'),
        image: joi.string().required(),
        cart: joi.array(),
        orderHistory: joi.array(),
        address: joi.object({
            address: joi.string().max(200).required(),
            city: joi.string().required(),
            postalCode: joi.number().required(),
            state: joi.string().required(),
        }),
        bank: joi.object({
            cardExpire: joi.string().required(),
            cardNumber: joi.string().required(),
            cardType: joi.string().required(),
            currency: joi.string().required(),
        })
    }),

    async validate(schema, values) {
        try {
            await schema.validateAsync(values)
            return false
        } catch ({ details: [{ message }] }) {
            return message;
        }
    }
}