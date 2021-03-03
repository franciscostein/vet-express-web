import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './DeleteAlert.module.css';

export default function AlertDialog(props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = decision => {
        setOpen(false);
        props.onChange(decision === true ? true : false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Remover registros?"}</DialogTitle>
                {/* <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ''
                </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                <Button onClick={() => handleClose(false)}>
                    Não
                </Button>
                <Button onClick={() => handleClose(true)} autoFocus>
                    <span className={styles.danger}>Sim</span>
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
