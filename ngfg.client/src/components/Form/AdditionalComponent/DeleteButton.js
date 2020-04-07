import React, {Component} from "react";
import axios from 'axios';
import './DeleteButton.css'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class DeleteButtonForm extends Component {

    state = {
        open: false,
        response: undefined,
        openResponse: false
    };

    handleRemove = () => {

        axios
            .delete(`${API_URL}/${API_VERSION}/forms/${this.props.form.id}`, {
                withCredentials: true,
            })
            .then(res => {
                this.setState({response: "Deleted successfully"});
            })
            .catch(err => {
                this.setState({response: err.response.data.message});
            });
        this.setState({openResponse: true});
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, openResponse: false},
            () => {
            this.props.handleDelete(
                this.state.response === "Deleted successfully",
                this.props.form);
        });
    };

    handleAgree = () => {
        this.setState({open: false});
        this.handleRemove();
    };

    render() {
        return (
            <div className='form-delete-wrapper'>
                <Button
                    size="medium"
                    className={this.props.deleteBtnClass}
                    endIcon={ this.props.disableIcon ? null : <DeleteIcon/>}
                    onClick={this.handleClickOpen}>
                    Delete
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">Delete Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to delete form <b>{this.props.form.name}</b>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} className='form-delete-dialog-btn'>
                            Disagree
                        </Button>
                        <Button onClick={this.handleAgree} className='form-delete-dialog-btn' autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openResponse}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">Result</DialogTitle>
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
        )
    }
}

export default DeleteButtonForm