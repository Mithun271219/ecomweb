import React, { useState, useContext, useEffect } from 'react'
import Context from '@/Components/Context/Context';
import { useRouter } from 'next/router'
import axios from 'axios'
import { Card, CardContent, CardMedia, Typography, ButtonGroup, Button } from '@mui/material';

let api = 'http://localhost:5000'

function buy({ product }) {

    let { cartlist, setcartlist } = useContext(Context)

    let [quantity, serQuantity] = useState(1)
    let [cartitems, setCartitems] = useState(quantity);

    let router = useRouter()
    let { productID } = router.query

    async function onDecrease() {
        if (cartitems > 0) {
            await setCartitems(cartitems--)
            setCartitems(cartitems)
        }
    }
    async function onIncrease() {
        await setCartitems(cartitems++)
        setCartitems(cartitems)
    }

    async function handelBuy() {
        router.push('/products/shippingdetails')
    }

    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-center allign-item-center my-3'>
                    <Card sx={{ display: 'flex', height: 300, width: 700 }}>
                        <CardMedia
                            component="img"
                            loading='lazy'
                            height="250"
                            image={product.thumbnail}
                            alt={product.title}
                            style={{ objectFit: 'contain' }}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <ButtonGroup sx={{ mt: 2 }} color="primary">
                                <Button onClick={() => onDecrease(product)}> - </Button>
                                <Button disabled> {cartitems} </Button>
                                <Button onClick={() => onIncrease(product)}> + </Button>
                            </ButtonGroup>
                            <Typography sx={{ mt: 2 }}>
                                Total Price: {Math.round(product.price - (product.price * product.discountPercentage / 100)) * cartitems} $
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='container'><Button fullWidth variant='contained' onClick={handelBuy}>Buy Now</Button></div>
        </>
    )
}

export default buy

export async function getServerSideProps({ query }) {
    let { data } = await axios.get(`${api}/products/getbyid/${query.productID}`)
    return {
        props: {
            product: data
        }
    }
}