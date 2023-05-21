import * as yup from 'yup';

export let signUpSchema = yup.object({
    firstName: yup.string().min(3).required(),
    lastName: yup.string().min(3).required(),
    age: yup.number().positive().required(),
    gender: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'password should match').required('please fill the same password'),
    image: yup.string().required(),
    cart: yup.array(),
    // address: yup.object({
    //     address: yup.string().max(200).required(),
    //     city: yup.string().required(),
    //     postalCode: yup.number().required(),
    //     state: yup.string().required(),
    // }),
    // bank: yup.object({
    //     cardExpire: yup.string().required(),
    //     cardNumber: yup.string().required(),
    //     cardType: yup.string().required(),
    //     currency: yup.string().required(),
    // })
})