import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import IsNotUser from './IsNotUser';
import IsUser from './IsUser';
import { useState, useContext } from 'react';
import Context from './Context/Context';
import { useRouter } from 'next/router';

export default function NavBar() {

    let router = useRouter();

    async function handelcontact() {
        router.push('/')
    }

    let { isLogin, setIsLogin } = useContext(Context)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link underline="none" style={{ color: 'white' }} href={'/'}>Products</Link>
                    </Typography>
                    <Button className='mx-2' variant='contained' onClick={handelcontact}>Contact Us</Button>
                    {isLogin ? <IsUser /> : <IsNotUser />}
                </Toolbar>
            </AppBar>
        </Box>
    );
}