import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { Typography, TextField, Card, CardActions, CardContent, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Context from '@/Components/Context/Context';
import { addressSchema } from '@/Components/Schemas/signup.address';

function address() {

    let { signUpData, setSignUpData } = useContext(Context);
    let router = useRouter();

    let initialValues = {
        address: {
            address: '',
            city: "",
            postalCode: '',
            state: ''
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: addressSchema,
        onSubmit: values => {
            setSignUpData({ ...signUpData, address: values.address });
            router.push('/auth/signup/address/payment')
        },
    });

    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit} >
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h5' >Address Details: </Typography>
                        <Typography variant='h6'>please enter the complete address in the below sections</Typography>
                        <TextField
                            id="address.address"
                            name="address.address"
                            label="Address"
                            fullWidth
                            type='text'
                            value={formik.values.address.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="standard"
                            error={formik.touched.address?.address && Boolean(formik.errors.address?.address)}
                            helperText={formik.touched.address?.address && formik.errors.address?.address}
                            margin="normal"
                        />
                        <TextField
                            id="address.city"
                            name="address.city"
                            label="City"
                            value={formik.values.address.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="standard"
                            error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                            helperText={formik.touched.address?.city && formik.errors.address?.city}
                            margin="normal"
                        />
                        <TextField
                            id="postalCode"
                            name="address.postalCode"
                            label="Postal Code"
                            type="number"
                            value={formik.values.address.postalCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="standard"
                            className='mx-3'
                            margin="normal"
                            error={formik.touched.address?.postalCode && Boolean(formik.errors.address?.postalCode)}
                            helperText={formik.touched.address?.postalCode && formik.errors.address?.postalCode}
                        />
                        <TextField
                            className='mx-3'
                            id="state"
                            name="address.state"
                            label="State"
                            value={formik.values.address.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            variant="standard"
                            error={formik.touched.address?.state && Boolean(formik.errors.address?.state)}
                            helperText={formik.touched.address?.state && formik.errors.address?.state}
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
        </div >
    )
}

export default address