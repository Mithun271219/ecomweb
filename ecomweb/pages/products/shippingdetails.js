import axios from 'axios'
import React, { useContext } from 'react'
import Context from '@/Components/Context/Context'
import { Typography, Button, Checkbox } from '@mui/material';
import AlertDialogSlide from '@/Components/Dialog';
import { useRouter } from 'next/router';

function shippingdetails() {

    let router = useRouter();

    let { user } = useContext(Context);

    //dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => {
        setOpen(false)
        router.push('/')
    };

    // Use empty object as default value if user or address is undefined
    //  let userAddress = user?.address || {}

    return (
        <>
            <div className='container'>
                <h2>Shipping Details</h2>
                <div className='row'>
                    <Typography variant='h5'>Name: {user?.firstName}</Typography>
                    <Typography variant='h5'>Phone Number: {user?.phone}</Typography>
                    <Typography variant='h5'>Address: {user?.address?.address}, {user?.address?.city}, {user?.address?.postalCode}, {user?.address?.state} </Typography>
                    <Typography variant='caption'><Checkbox /> I accept the tems and services of the company and i knows that there is no return or replacement of products which i am buying from this website</Typography>
                </div>
                <Button variant='contained' color='warning' onClick={handleClickOpen}>Place Order</Button>
            </div>
            <AlertDialogSlide open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </>
    )
}

export default shippingdetails

// export async function getServerSideProps() {
//     let { data } = await axios.get('http://localhost:5000/users/1')
//     return {
//         props: {
//             user: data
//         }
//     }
// }