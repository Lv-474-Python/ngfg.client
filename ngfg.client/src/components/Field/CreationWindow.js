import CreateField from './CreateField'
import './Field.css'
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
            // openResponse: false
        }))
    };
    // handleAgree = () => {
    //     this.setState({open: true, openResponse: true});
    // };
    //
    // setResponse = (response) => {
    //     this.setState({response});
    // };


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
                <Dialog open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        maxWidth={"sm"}
                        fullWidth={true}
                        minHeight={"100px"}>
                    <DialogTitle id="form-dialog-title" className="create-field-header">Create field</DialogTitle>
                    <DialogContent>
                        <CreateField getData={this.props.getData}
                                     handleClose={this.handleClose}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default FieldCreationWindow;