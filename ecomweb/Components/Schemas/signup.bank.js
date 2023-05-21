import * as yup from 'yup';

export let bankSchema = yup.object().shape({
    bank: yup.object({
        cardExpire: yup.string().required(),
        cardNumber: yup.string().required(),
        cardType: yup.string().required(),
        currency: yup.string().required(),
    })
})