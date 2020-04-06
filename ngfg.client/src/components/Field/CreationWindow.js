import CreateField from './CreateField'

import React, {Component} from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

class FieldCreationWindow extends Component {

    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClose = () => {
        this.setState(({
            open: false
        }))
    };

    render() {
        let button = undefined;
        if (this.props.text === 'Create field') {
            button = <Button className="filter-create-btn" size='medium' onClick={this.handleClickOpen}>
                Create Field
            </Button>
        } else if (this.props.text === '+') {
            button =
                <div className="new-field-item" onClick={this.handleClickOpen}>
                    +
                </div>
        }
        return (

            <div>
                {button}
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Field creation</DialogTitle>
                    <DialogContent>
                        <CreateField getData={this.props.getData}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FieldCreationWindow;