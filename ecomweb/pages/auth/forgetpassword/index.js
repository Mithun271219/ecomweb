import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import { usernamevalidation } from '@/Components/Schemas/ForgetPassword/Username-val-schema'
import { useRouter } from 'next/router'
import { Container, Button, TextField, CircularProgress } from '@mui/material'
import axios from 'axios'
import Context from '@/Components/Context/Context'

function forgetpassword() {

    let router = useRouter();
    const [loading, setLoading] = useState(false);
    let { backendLink } = useContext(Context)


    let initialValues = {
        username: ''
    }

    let { values, handleBlur, handleChange, handleSubmit, isValid, errors, touched } = useFormik({
        initialValues,
        validationSchema: usernamevalidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                // setLoading(true)
                let { data } = await axios.post(`${backendLink}/users/username`, values)
                console.log(data)
                // resetForm();
                // if (data) {
                //     router.push(`/auth/forgetpassword/reset/otpvalidation`)
                // } else {
                //     router.push(`/auth/forgetpassword/`)
                // }
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
                            <h4>Enter the username inside the below text filed</h4>
                            <Container >
                                <div>
                                    <TextField variant='standard' className='my-3' name='username' value={values.username} label='username' onChange={handleChange} onBlur={handleBlur} type='text' error={touched.username && Boolean(errors.username)} helperText={touched.username && errors.username} />
                                </div>
                                <div>
                                    <Button type='submit' variant='contained'>Get OTP</Button>
                                </div>
                            </Container>
                        </form>
                    </Container>
            }
        </>
    )
}

export default forgetpassword