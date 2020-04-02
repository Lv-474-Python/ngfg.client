import React, {Component} from 'react';

import GroupCreation from "./GroupCreation"

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

class GroupCreationWindow extends Component{
    state = {
        open: false
    };
    handleClickOpen = () =>{
        this.setState({
            open: true
        })
    };
    handleClose = () =>{
        this.setState(({
            open: false
        }))
    };
    render() {
        return (
        <div>
            <Button className="create-group-btn" size='large' onClick={this.handleClickOpen}>Create Group</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Field creation</DialogTitle>
                <DialogContent>
                    <GroupCreation />
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

export default GroupCreationWindow;