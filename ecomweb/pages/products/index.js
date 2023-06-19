import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Rating from '@mui/material/Rating';
import ImageCollection from '@/Components/Carousel';
import Context from '@/Components/Context/Context';
import SimilarProducts from '@/Components/SimilarProducts';
import CustomSnackbar from '@/Components/Snackbar';

function product({ product, randomreviews, randomratings, productsByCategory }) {

    let router = useRouter();
    let { user, getuser, isLogin, backendLink } = useContext(Context)
    const [inCart, setinCart] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)

    //snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (!product) {
        return (
            <>
                <div>data not Found </div>
                <Link href={'/'}>got to home page</Link>
            </>
        )
    }

    async function handelremoveCart(productID) {
        setBtnLoading(true, () => { })
        try {
            let resposne = await axios.put(`${backendLink}/user/removefromcart`, { id: product.id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            await getuser();
            setinCart(false)
            setSnackbarMessage(resposne.data.message)
            setSnackbarSeverity('warning')
            setSnackbarOpen(true)
        } catch (error) {
            let response = error.response.data.message;
            console.log(response)
            setSnackbarMessage(response)
            setSnackbarSeverity('error')
            setSnackbarOpen(true)
        } finally {
            setBtnLoading(false, () => { })
        }
    }

    async function handelAddToCart(productId) {
        setBtnLoading(true, () => { })
        if (!isLogin) {
            router.push('/auth/signin')
            setSnackbarMessage('Please sign in to continue')
            setSnackbarSeverity('info')
            setSnackbarOpen(true)
        } else {
            try {
                let addedtocart = await axios.put(`${backendLink}/user/addtocart`, { ...product, quantity: 1 }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                await getuser();
                setinCart(true)
                setSnackbarMessage(addedtocart.data.message)
                setSnackbarSeverity('success')
                setSnackbarOpen(true)
            } catch (error) {
                let response = error.response.data.message;
                console.log(response)
                setSnackbarMessage(response)
                setSnackbarSeverity('error')
                setSnackbarOpen(true)
            } finally {
                setBtnLoading(false, () => { })
            }
        }
    }

    async function handelBuy(productId) {
        if (!isLogin) {
            router.push('/auth/signin')
        } else {
            router.push(`/products/buy?productID=${productId}`)
        }
    }

    useEffect(() => {
        if (isLogin) {
            let isincrt = user.cart.filter((item) => { return item.id === product.id });
            if (isincrt.length === 0) {
                setinCart(false)
            } else if (isincrt[0].id === product.id) {
                setinCart(true);
            }
        } else {
            setinCart(false)
        }
    }, [product, user, isLogin])

    return (
        <>
            <div className='container my-3'>
                <ImageCollection images={product.images} title={product.title} />
                <h1>{product.title}</h1>
                <div>
                    <Rating value={Math.round(product.rating) - 1} readOnly />
                    <span>{randomratings} Ratings and {randomreviews} Reviews </span>
                </div>
                <div>
                    <span style={{ color: 'green' }}>{product.discountPercentage}% off&nbsp;</span>
                    <span><s>{product.price}</s></span>
                    <h4>{Math.round(product.price - (product.price * product.discountPercentage / 100))} $</h4>
                </div>
                <div className='button-container mx-2'>
                    {
                        !inCart ? <Button style={{ width: 220 }} variant="contained" onClick={() => handelAddToCart(product.id)} startIcon={<ShoppingCartOutlinedIcon />} disabled={btnLoading ? true : false}>
                            {btnLoading ? <span className='loader'></span> : <span>Add to Cart</span>}
                        </Button> :
                            <Button style={{ width: 220 }} variant="contained" color='error' onClick={() => handelremoveCart(product.id)} startIcon={<ShoppingCartOutlinedIcon />} disabled={btnLoading ? true : false}>
                                {btnLoading ? <span className='loader'></span> : <span>Remove From Cart</span>}
                            </Button>
                    }
                    <Button variant="contained" onClick={() => handelBuy(product.id)} startIcon={<ShoppingBagOutlinedIcon />}>
                        Buy Now
                    </Button>
                </div>
                <div>
                    Brand: {product.brand} <br />
                    Description: {product.description} <br />
                    Category : {product.category} <br />
                    Stock: {product.stock} <br />
                </div>
                <div className='container similar-products my-2'>
                    <SimilarProducts category={product.category} productsByCategory={productsByCategory} />
                </div>
            </div>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </>
    )
}

export default product;

export async function getServerSideProps({ query }) {
    let { productID } = query

    const { data } = await axios.get(`https://ecomweb-backend.onrender.com/products/getbyid/${productID}`)
    let productbycategory = await axios.get(`https://ecomweb-backend.onrender.com/products/category?category=${data.category}`)
    let productsByCategory = productbycategory.data

    return {
        props: {
            product: data,
            productsByCategory,
            randomratings: Math.floor(Math.random() * 10000),
            randomreviews: Math.floor(Math.random() * 1000)
        }
    }
}



// export async function getStaticPaths() {
//     const { data } = await axios.get(`${api}/products`)
//     let paths = data.map(ele => {
//         return {
//             params: {
//                 productID: `${ele.id}`
//             }
//         }
//     })
//     return {
//         paths,
//         fallback: true
//     }
// }

// export async function getStaticProps({ params }) {
//     // let { params } = context
//     const { data } = await axios.get((`${api}/products/${params.productID}`))

//     if (!data.id) {
//         return {
//             notFound: true
//         }
//     }

//     return {
//         props: {
//             product: data,
//             randomratings: Math.floor(Math.random() * 10000),
//             randomreviews: Math.floor(Math.random() * 1000)
//         },
//         revalidate: 10
//     }
// }