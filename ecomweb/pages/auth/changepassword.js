import React, { useState, useContext } from 'react';
import Context from '@/Components/Context/Context';
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import { Button, Typography, TextField, Container, CircularProgress } from '@mui/material'
import { resetpasswordvalidation } from '@/Components/Schemas/ForgetPassword/passwordvalidation-schema';
import axios from 'axios';
import CustomSnackbar from '@/Components/Snackbar';

function reset() {

    let { query } = useRouter();// let context=useRouter and let {username}=router.query
    const [loading, setLoading] = useState(false);
    let router = useRouter();
    let { user } = useContext(Context);

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => { setSnackbarOpen(false) };

    let initialValues = {
        password: '',
        cpassword: ""
    }

    let { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: resetpasswordvalidation,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true)
                let response = await axios.put('http://localhost:5000/user/auth/reset/password', values, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                // resetForm();
                router.push('/')
                setSnackbarMessage(response.data.message)
                setSnackbarSeverity('success')
                setSnackbarOpen(true)
            } catch ({ response: { data: { message } } }) {
                let response = message;
                errors.cpassword = message
                setSnackbarMessage(response)
                setSnackbarSeverity('error')
                setSnackbarOpen(true)
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
                        <form >
                            <Typography variant='h3'> Hello {user.username} </Typography>
                            <Typography variant='body1'> Kindly reset the password </Typography>
                            <div>
                                <TextField variant='standard' className='my-2' label='password' type='password' value={values.password} onChange={handleChange} onBlur={handleBlur} name='password' error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
                            </div>
                            <div>
                                <TextField variant='standard' className='my-2' label='confirm-password' type='password' value={values.cpassword} onChange={handleChange} onBlur={handleBlur} name='cpassword' error={touched.cpassword && Boolean(errors.cpassword)} helperText={touched.cpassword && errors.cpassword} />
                            </div>
                            <div>
                                <Button type='submit' variant='contained' color='primary' disabled={!isValid} onClick={handleSubmit}>Reset</Button>
                            </div>
                        </form>
                        <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleSnackbarClose} />
                    </Container >
            }


        </>

    )
}

export default reset