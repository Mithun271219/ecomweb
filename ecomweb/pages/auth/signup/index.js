import React from 'react'
import { Typography, TextField, Card, CardActions, CardContent, Button, Select, MenuItem, InputLabel } from '@mui/material'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useContext } from 'react';
import Context from '@/Components/Context/Context';
import { signUpSchema } from '@/Components/Schemas/SignUp-schema';
import { useFormik } from 'formik';

function SignUp() {

    let { signUpData, setSignUpData } = useContext(Context);
    let router = useRouter();

    let imageslink = [
        'https://robohash.org/accusantiumvoluptateseos.png',
        'https://robohash.org/autquiaut.png',
        'https://robohash.org/quisequienim.png',
        'https://robohash.org/namquaerataut.png',
        'https://robohash.org/impeditautest.png',
        'https://robohash.org/aliquamcumqueiure.png',
        'https://robohash.org/excepturiiuremolestiae.png',
        'https://robohash.org/laboriosamfacilisrem.png',
        'https://robohash.org/adverovelit.png',
        'https://robohash.org/consequunturautconsequatur.png',
        'https://robohash.org/doloremquesintcorrupti.png',
        'https://robohash.org/hicveldicta.png'
    ]

    let initialValues = {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        cpassword: "",
        image: '',
        cart: []
    };

    const { touched, errors, handleBlur, values, isValid, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: values => {
            setSignUpData(values)
            router.push('/auth/signup/address')
        },
    });

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} >
                <Card variant='outlined'>
                    <CardContent>

                        <div>
                            <TextField
                                className='mx-5'
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                type='text'
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                margin="normal"
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                            <TextField
                                className='mx-5'
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                margin="normal"
                            />
                        </div>
                        <div className='row' >
                            <div className='col-3'>
                                <TextField
                                    className='mx-5'
                                    id="age"
                                    name="age"
                                    label="Age"
                                    type="number"
                                    value={values.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="standard"
                                    error={touched.age && Boolean(errors.age)}
                                    helperText={touched.age && errors.age}
                                    margin="normal"
                                />

                            </div>
                            <div className="col-6">
                                <InputLabel id="gender-label">Select Gender</InputLabel>
                                <Select
                                    size='small'
                                    labelId="gender-label"
                                    id="gender"
                                    name='gender'
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="" defaultChecked><em>None</em></MenuItem>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                    <MenuItem value='others'>Others</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                className='mx-5'
                                margin="normal"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                className='mx-5'
                                margin="normal"
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                            />
                        </div>

                        <div className="row">
                            <div className='col-6'>
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="standard"
                                    className='mx-5'
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                    margin="normal"
                                />
                            </div>
                            <div className="col-6">
                                <InputLabel id="image-label">Select Image</InputLabel>
                                <Select
                                    size='small'
                                    labelId="image-label"
                                    id="image"
                                    name='image'
                                    value={values.image}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value="" defaultChecked><em>None</em></MenuItem>
                                    {
                                        imageslink.map((img, index) => {
                                            return (
                                                <MenuItem key={index} value={img}>
                                                    {index}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        <div>
                            <TextField
                                className='mx-5'
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                margin="normal"
                            />
                            <TextField
                                className='mx-5'
                                id="cpassword"
                                name="cpassword"
                                label="Confirm-Password"
                                type="password"
                                value={values.cpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="standard"
                                error={touched.cpassword && Boolean(errors.cpassword)}
                                helperText={touched.cpassword && errors.cpassword}
                                margin="normal"
                            />
                        </div>

                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </div >
    )
}

export default SignUp