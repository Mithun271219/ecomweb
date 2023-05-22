import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Typography, TextField, Card, CardActions, CardContent, Button } from '@mui/material'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Context from '@/Components/Context/Context';
import axios from 'axios';
import { bankSchema } from '@/Components/Schemas/signup.bank';
import CustomSnackbar from '@/Components/Snackbar';

function payment() {

    let { backendLink, signUpData, setSignUpData } = useContext(Context);
    let router = useRouter();

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => { setSnackbarOpen(false) };

    let initialValues = {
        bank: {
            cardExpire: "",
            cardNumber: '',
            cardType: '',
            currency: ""
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: bankSchema,
        onSubmit: async (values) => {
            try {
                let response = await axios.post(`${backendLink}/auth/users/signup`, { ...signUpData, bank: values.bank })
                setSnackbarMessage(response.data.message)
                setSnackbarSeverity('success')
                setSnackbarOpen(true)
                router.push('/auth/signin')
            } catch (error) {
                let resposne = error.response.data.message
                console.log(error)
                setSnackbarMessage(resposne)
                setSnackbarSeverity('error')
                setSnackbarOpen(true)
            }
        },
    });

    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit} >
                <Card variant='outlined'>
                    <CardContent>
                        <TextField
                            id="cardExpire"
                            name="bank.cardExpire"
                            placeholder='03/24'
                            label="Card Expirey Date"
                            value={formik.values.bank.cardExpire}
                            onChange={formik.handleChange}
                            variant="standard"
                            className='mx-3'
                            error={formik.touched.bank?.cardExpire && Boolean(formik.errors.bank?.cardExpire)}
                            helperText={formik.touched.bank?.cardExpire && formik.errors.bank?.cardExpire}
                            margin="normal"
                        />
                        <TextField
                            id="cardNumber"
                            name="bank.cardNumber"
                            label="Card Number"
                            placeholder='123456789097642'
                            type='text'
                            value={formik.values.bank.cardNumber}
                            onChange={formik.handleChange}
                            variant="standard"
                            className='mx-3'
                            error={formik.touched.bank?.cardNumber && Boolean(formik.errors.bank?.cardNumber)}
                            helperText={formik.touched.bank?.cardNumber && formik.errors.bank?.cardNumber}
                            margin="normal"
                        />
                        <TextField
                            id="cardType"
                            name="bank.cardType"
                            placeholder='Ru Pay, Master, Visa...'
                            label="Card Type"
                            value={formik.values.bank.cardType}
                            onChange={formik.handleChange}
                            variant="standard"
                            className='mx-3'
                            error={formik.touched.bank?.cardType && Boolean(formik.errors.bank?.cardType)}
                            helperText={formik.touched.bank?.cardType && formik.errors.bank?.cardType}
                            margin="normal"
                        />
                        <TextField
                            id="currency"
                            name="bank.currency"
                            label="Currency"
                            placeholder='INR/USD'
                            value={formik.values.bank.currency}
                            onChange={formik.handleChange}
                            variant="standard"
                            className='mx-3'
                            error={formik.touched.bank?.currency && Boolean(formik.errors.bank?.currency)}
                            helperText={formik.touched.bank?.currency && formik.errors.bank?.currency}
                            margin="normal"
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" type="submit" disabled={!formik.isValid}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleSnackbarClose} />
        </div >
    )
}

export default payment