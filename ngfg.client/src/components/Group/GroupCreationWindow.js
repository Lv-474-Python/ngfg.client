import React, {Component} from 'react';

import GroupCreation from "./GroupCreation"

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

import './Group.css'

class GroupCreationWindow extends Component{
    state = {
        open: false,
        fullWidth: true,
        maxWidth: 'sm'
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
        return (
            <div>
                <Button className="create-group-btn" size='large' onClick={this.handleClickOpen}>Create Group</Button>
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title"
                            maxWidth={this.state.maxWidth}
                            fullWidth={this.state.fullWidth}
                    >
                        <DialogTitle id="form-dialog-title"
                                     className='group-create-header'>Group creation</DialogTitle>
                        <DialogContent>
                            <GroupCreation getData={this.props.getData} handleClose={this.handleClose}/>
                        </DialogContent>
                        {/*<DialogActions>*/}
                        {/*    <Button onClick={this.handleClose} color="primary">*/}
                        {/*        Cancel*/}
                        {/*    </Button>*/}
                        {/*</DialogActions>*/}
                    </Dialog>
                    </div>
                </div>
                );
                }
                }

                export default GroupCreationWindow;