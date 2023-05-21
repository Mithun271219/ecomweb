import React from 'react'
import { Button } from '@mui/material'


function RomoveCart() {

    function handleremove() {

    }

    return (
        <>
            <Button variant="contained" onClick={() => handleremove(product.id)} startIcon={<ShoppingCartOutlinedIcon />}>
                Add to Cart
            </Button>
        </>
    )
}

export default RomoveCart