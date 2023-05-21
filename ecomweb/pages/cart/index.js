import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Context from '@/Components/Context/Context';
import { ButtonGroup, Typography, CardContent, CardMedia, Card, Button } from '@mui/material';
import { useRouter } from 'next/router';
import CustomSnackbar from '@/Components/Snackbar';

function cart({ cart }) {

    let router = useRouter()
    let { user, getuser } = useContext(Context)
    let [sum, setsum] = useState(0)

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => { setSnackbarOpen(false) };

    async function onDecrease(index) {
        let quantity = user.cart[index].quantity;
        let id = user.cart[index].id;
        if (quantity > 0) {
            quantity = quantity - 1;
            if (quantity === 0) {
                try {
                    let resposne = await axios.put('http://localhost:5000/user/removefromcart', { id: id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                    getuser();
                    setSnackbarMessage(resposne.data.message)
                    setSnackbarSeverity('warning')
                    setSnackbarOpen(true)
                } catch (error) {
                    console.log(error);
                    let response = error.response.data.message;
                    setSnackbarMessage(response)
                    setSnackbarSeverity('error')
                    setSnackbarOpen(true)
                }
            } else {
                try {
                    let resposne = await axios.put('http://localhost:5000/user/alterquantity', { id, quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                    getuser();
                    setSnackbarMessage(resposne.data.message)
                    setSnackbarSeverity('success')
                    setSnackbarOpen(true)
                } catch (error) {
                    console.log(error);
                    let response = error.response.data.message
                    setSnackbarMessage(response)
                    setSnackbarSeverity('error')
                    setSnackbarOpen(true)
                }
            }
        }
    }

    async function onIncrease(index) {
        let id = user.cart[index].id;
        let quantity = user.cart[index].quantity + 1;
        try {
            let response = await axios.put('http://localhost:5000/user/alterquantity', { id, quantity }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            getuser();
            setSnackbarMessage(response.data.message)
            setSnackbarSeverity('success')
            setSnackbarOpen(true)
        } catch (error) {
            console.log(error);
            let response = error.response.data.message
            setSnackbarMessage(response)
            setSnackbarSeverity('error')
            setSnackbarOpen(true)
        }
    }

    async function handelBuy() {
        router.push('/products/shippingdetails')
    }

    useEffect(() => {
        let total = user.cart.reduce((acc, ele) => {
            return acc + (Math.round(ele.price - (ele.price * ele.discountPercentage / 100)) * ele.quantity)
        }, 0)
        setsum(total)
    }, [user, sum])

    return (
        <div className='container'>
            {
                user.cart.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='d-flex justify-content-center allign-item-center  my-3'>
                                <Card sx={{ display: 'flex', height: 300, width: 700 }}>
                                    <CardMedia
                                        className='my-2'
                                        component="img"
                                        loading='lazy'
                                        height="250"
                                        image={item.thumbnail}
                                        alt={item.title}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <CardContent sx={{ flex: 1 }} >
                                        <Typography variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <ButtonGroup sx={{ mt: 2 }} color="primary">
                                            <Button onClick={() => onDecrease(index)}> - </Button>
                                            <Button disabled> {item.quantity} </Button>
                                            <Button onClick={() => onIncrease(index)}> + </Button>
                                        </ButtonGroup>
                                        <Typography sx={{ mt: 2 }}>
                                            Total Price: {Math.round(item.price - (item.price * item.discountPercentage / 100)) * item.quantity} $
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )
                })
            }

            <div className='container'>
                <Typography variant='h5'>Total Amount: {sum} $</Typography>
            </div>
            <div className='container'><Button fullWidth variant='contained' onClick={handelBuy}>Buy Now</Button></div>
            <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleSnackbarClose} />
        </div>
    )
}

export default cart;

// export async function getServerSideProps() {
//     // let { data } = await axios.get(`http://localhost:5000/users/1`)
//     let { data } = await axios.get(`http://localhost:5000/user`)
//     return {
//         props: { cart: data }
//     }
// }