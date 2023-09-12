import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import { usernamevalidation } from '@/Components/Schemas/ForgetPassword/Username-val-schema'
import { useRouter } from 'next/router'
import { Container, Button, TextField, CircularProgress } from '@mui/material'
import axios from 'axios'
import Context from '@/Components/Context/Context'

function otpValidation() {

    let router = useRouter();
    const [loading, setLoading] = useState(false);
    let { backendLink } = useContext(Context)


    let initialValues = {
        otp: ''
    }

    let { values, handleBlur, handleChange, handleSubmit, isValid, errors, touched } = useFormik({
        initialValues,
        validationSchema: usernamevalidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true)
                let { data } = await axios.post(`${backendLink}/users/otpvalidation/${query.userotp}`, values)
                // resetForm();
                router.push(`/auth/forgetpassword/reset/${data.username}`)
            } catch ({ response: { data: { message } } }) {
                errors.username = message
            } finally {
                setTimeout(() => setLoading(false), 500)
            }
        }
    })


    return (
        <>
            {
                loading ? <div className="productsSpinners">< CircularProgress /></div> :
                    <Container className='signinform'>
                        <form onSubmit={handleSubmit}>
                            <h4>Enter the OTP sent to registered email</h4>
                            <Container >
                                <div>
                                    <TextField variant='standard' className='my-3' name='otp' value={values.otp} label='otp' onChange={handleChange} onBlur={handleBlur} type='text' error={touched.otp && Boolean(errors.otp)} helperText={touched.otp && errors.otp} />
                                </div>
                                <div>
                                    <Button type='submit' variant='contained'>Validate OTP</Button>
                                </div>
                            </Container>
                        </form>
                    </Container>
            }
        </>
    )
}

export default otpValidation