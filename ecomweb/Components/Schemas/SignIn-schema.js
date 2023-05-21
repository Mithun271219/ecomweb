import * as yup from 'yup';

export let validateSign = yup.object().shape({
    username: yup.string().min(3).max(12).required(' * username is required'),
    password: yup.string().min(4).max(16).required(' * password is rewuired')
})