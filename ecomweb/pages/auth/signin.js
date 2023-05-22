import React, { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import { validateSign } from '@/Components/Schemas/SignIn-schema';
import TextField from '@mui/material/TextField';
import Context from '@/Components/Context/Context';
import { Button, Typography, Container, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import CustomSnackbar from '@/Components/Snackbar';

function SignIn() {

    let router = useRouter();
    let { isLogin, setIsLogin, getuser, user, backendLink } = useContext(Context)
    const [loading, setLoading] = useState(false)

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    let initialValues = {
        username: '',
        password: ''
    }

    let { values, handleBlur, handleChange, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        validationSchema: validateSign,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true)
                let { data, status } = await axios.post(`${backendLink}/auth/users/signin`, values)
                if (status === 200) {
                    localStorage.setItem('token', data.token)
                    await getuser();
                    setIsLogin(true);
                    setSnackbarSeverity('success')
                    setSnackbarMessage(data.message)
                    setSnackbarOpen(true)
                    // resetForm();
                    router.push('/')
                }
            } catch ({ response: { data: { message } } }) {
                errors.password = message;
                setSnackbarSeverity('error')
                setSnackbarMessage(message)
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
                    <>
                        <Container className='container signinform'>
                            <form onSubmit={handleSubmit}  >
                                <div>
                                    <Typography variant='h5'>Sign In</Typography>
                                </div>
                                <div>
                                    <TextField name='username' onChange={handleChange} onBlur={handleBlur} value={values.username} label="Username" variant="standard"
                                        error={touched.username && Boolean(errors.username)}
                                        helperText={touched.username && errors.username} />
                                </div>
                                <div>
                                    <TextField label='Password' type='password' name='password' onChange={handleChange} onBlur={handleBlur} value={values.password} variant='standard'
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </div>
                                <div>
                                    <Link href={'/auth/forgetpassword'} underline="none" >
                                        <Typography variant="caption" display="block" gutterBottom>
                                            forget password
                                        </Typography>
                                    </Link>
                                </div>
                                <div>
                                    <Button type='submit' variant="contained" disabled={!isValid}>Submit</Button>
                                </div>
                            </form>
                        </Container>
                        <CustomSnackbar
                            open={snackbarOpen}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={handleSnackbarClose}
                        />
                    </>
            }

        </>
    )
}

export default SignIn