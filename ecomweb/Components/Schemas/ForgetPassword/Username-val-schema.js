import * as yup from 'yup';

export const usernamevalidation = yup.object({
    username: yup.string().min(3).max(12).required('user name is required for resetting password')
})