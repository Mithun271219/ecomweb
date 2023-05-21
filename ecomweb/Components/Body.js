import Image from 'next/image';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import Link from 'next/link';

function Body({ products }) {

    if (!products) {
        return (
            <CircularProgress />
        )
    }
    return (
        <div className='container'>
            {
                products.map(mobile => {
                    return (
                        <Link key={mobile.id} href={`/products?productID=${mobile.id}&category=${mobile.category}`}>
                            <Card className='card-container' >
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
    )
}

export default Body;


