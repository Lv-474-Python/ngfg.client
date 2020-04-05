import React, {Component} from 'react';

import GroupCreation from "./GroupCreation"

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import './Group.css'

class GroupCreationWindow extends Component {
    state = {
        open: false,
        response: undefined,
        openResponse: false
    };
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };
    handleClose = () => {
        this.setState(({
            open: false,
            openResponse: false
        }))
    };

    handleAgree = () => {
        this.setState({open: true, openResponse: true});
    };

    setResponse = (response) => {
        this.setState({response});
    };

    render() {
        return (
            <div>
                <Button className="create-group-btn" size='large' onClick={this.handleClickOpen}>Create Group</Button>
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title"
                            maxWidth={"sm"}
                            fullWidth={true}
                    >
                        <DialogTitle id="form-dialog-title"
                                     className='group-create-header'>Group creation</DialogTitle>
                        <DialogContent>
                            <GroupCreation getData={this.props.getData}
                                           handleClose={this.handleClose}
                                           setResponse={this.setResponse}
                                           handleAgree={this.handleAgree}
                            />
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={this.state.openResponse}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle
                            id="alert-dialog-title">{"Result"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.response}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default GroupCreationWindow;