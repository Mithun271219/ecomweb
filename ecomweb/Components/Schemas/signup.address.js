import * as yup from 'yup';

export let addressSchema = yup.object({
    address: yup.object({
        address: yup.string().max(200).required(),
        city: yup.string().required(),
        postalCode: yup.number().required(),
        state: yup.string().required(),
    })
})