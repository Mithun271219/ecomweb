import React, { useContext } from 'react'
import { Button } from '@mui/material'
import Context from '../Context/Context'

function AddToCart() {

    let { cartitems, setCartitems } = useContext(Context)

    function handelAddToCart() {

    }

    return (
        <>
            <Button variant="contained" onClick={() => handelAddToCart(product.id)} startIcon={<ShoppingCartOutlinedIcon />}>
                Add to Cart
            </Button>
        </>
    )
}

export default AddToCart