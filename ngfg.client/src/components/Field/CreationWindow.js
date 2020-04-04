import CreateField from './CreateField'

import React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    var button = undefined;
    console.log(props.text);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (props.text === 'Create field') {
        button = <Button className="filter-create-btn" size='medium' onClick={handleClickOpen}>
            Create Field
        </Button>
    } else if (props.text === '+') {
        button =
            <div className="new-field-item" onClick={handleClickOpen}>
                +
            </div>
    }

    return (

        <div>
            {button}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Field creation</DialogTitle>
                <DialogContent>
                    <CreateField getData={props.getData} handleClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
