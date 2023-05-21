import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

export default function AlertDialogSlide({ handleClickOpen, handleClose, open }) {

    return (
        <div>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Order Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Thank you for shopping with us. <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores perspiciatis assumenda laboriosam veritatis dolore laborum accusamus voluptate non, laudantium dignissimos suscipit omnis modi tempora quos aliquid molestias mollitia eaque corrupti?<br />
                        Happy Shopping!!!😊
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>close</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}