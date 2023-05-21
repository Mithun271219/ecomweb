import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import { usernamevalidation } from '@/Components/Schemas/ForgetPassword/Username-val-schema'
import { useRouter } from 'next/router'
import { Container, Button, TextField, CircularProgress } from '@mui/material'
import axios from 'axios'

function forgetpassword() {

    let router = useRouter();
    const [loading, setLoading] = useState(false);


    let initialValues = {
        username: ''
    }

    let { values, handleBlur, handleChange, handleSubmit, isValid, errors, touched } = useFormik({
        initialValues,
        validationSchema: usernamevalidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true)
                let { data } = await axios.post('http://localhost:5000/users/username', values)
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
                            <h4>Enter the username inside the below text filed</h4>
                            <Container >
                                <div>
                                    <TextField variant='standard' className='my-3' name='username' value={values.username} label='username' onChange={handleChange} onBlur={handleBlur} type='text' error={touched.username && Boolean(errors.username)} helperText={touched.username && errors.username} />
                                </div>
                                <div>
                                    <Button type='submit' variant='contained'>Continue</Button>
                                </div>
                            </Container>
                        </form>
                    </Container>
            }
        </>
    )
}

export default forgetpassword