import * as yup from 'yup';

export const userOTP = yup.object({
    otp: yup.string().min(4).max(4).required('OTP is required')
})