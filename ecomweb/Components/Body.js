import Image from 'next/image';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import Link from 'next/link';

function Body({ products }) {

    const [productsPerPage, setProductsPerPage] = useState(8);
    let numberOfTotalPages = Math.ceil(products.length / productsPerPage);
    let pages = [...Array(numberOfTotalPages + 1).keys()].slice(1);
    const [currentPage, setcurrentPage] = useState(1);

    let indexOfLastProduct = productsPerPage * currentPage;
    let indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const visibleProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    if (!products) {
        return (
            <CircularProgress />
        )
    }
    return (
        <>
            <div className='container d-flex flex-wrap justify-content-center gap-3'>
                {
                    visibleProducts.map(mobile => {
                        return (
                            <Link key={mobile.id} href={`/products?productID=${mobile.id}&category=${mobile.category}`} >
                                <Card className='card-container '>
                                    <CardActionArea >
                                        <CardMedia>
                                            <Image priority className='card-image' width={200} height={200} src={mobile.thumbnail} alt={mobile.title} />
                                            {/* loading='lazy' used inside Image tag to load the image lazely */}
                                            <CardContent>
                                                <Typography className='card-title' gutterBottom variant="h5" component="div">
                                                    {mobile.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {mobile.brand}
                                                </Typography>
                                                <Typography className='inline-typo' variant="body2" color="green">
                                                    Min. {mobile.discountPercentage}%
                                                </Typography>
                                                <Typography className='inline-typo' variant="body2" color="text.secondary">
                                                    <s>{mobile.price}</s>
                                                </Typography>
                                                <Typography className='inline-typo' variant="button" display="block" gutterBottom>
                                                    {Math.round(mobile.price - (mobile.price * mobile.discountPercentage / 100))} $
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <Rating value={Math.round(mobile.rating) - 1} readOnly />
                                                </Typography>
                                            </CardContent>
                                        </CardMedia>
                                    </CardActionArea>
                                </Card>
                            </Link >
                        )
                    })
                }
            </div>
            <div className='d-flex justify-content-center my-3'>
                <nav className='Page navigation justify-content-center'>
                    <ul className='pagination'>
                        <li className='page-item'><span className="page-link " onClick={() => { currentPage === 1 ? null : setcurrentPage(currentPage - 1) }}>{`<< prev`}</span></li>
                        {
                            pages.map((page) => {
                                return <li className='page-item' key={page}><span className={currentPage === page ? "page-link active" : "page-link"} onClick={() => setcurrentPage(page)}>{page}</span></li>
                            })
                        }
                        <li className='page-item'><span className="page-link" onClick={() => { currentPage === numberOfTotalPages ? null : setcurrentPage(currentPage + 1) }}>{`next >>`}</span></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Body;


