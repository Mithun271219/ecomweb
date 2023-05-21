import * as yup from 'yup';

export const resetpasswordvalidation = yup.object({
    password: yup.string().min(4).max(16).required('password is required'),
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'password should match').required('please fill the same password')
})