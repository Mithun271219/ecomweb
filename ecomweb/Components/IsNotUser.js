import React from 'react'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

function IsUser() {

    let router = useRouter();

    return (
        <div>
            <Button color="inherit" onClick={() => router.push('/auth/signin')}>Sign-In</Button>
            <Button color="inherit" onClick={() => router.push('/auth/signup')}>Sign-Up</Button>
        </div>
    )
}

export default IsUser