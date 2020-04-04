import React, {Component} from "react";
import axios from 'axios';

import '../../Form/Form.css'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ChoiceOptionList from "../Restrictions/ChoiceOptionList";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class ShareField extends Component {

    state = {
        open: false,
        recipients: [],
        response: undefined,
        openResponse: false
    };

    handleShare = () => {

        axios
            .post(`${API_URL}/${API_VERSION}/shared_fields/`,
                {
                    fieldId: this.props.field.id,
                    recipients: this.state.recipients
                },
                {withCredentials: true,})
            .catch(err => {
                let response = err.response.data.message;
                if(typeof(response) != "string") {
                    response = Object.entries(response.recipients).map(elem => {
                        return "\n" + this.state.recipients[elem[0]] +
                            ": " + elem[1].toString().slice(0,-1)
                    }).toString();
                }
                this.setState({response});
                this.setState({openResponse: true});
            });
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, openResponse: false});
    };

    handleAgree = () => {
        this.setState({open: false});
        this.handleShare();
    };

    setRecipients = (recipients) => {
        this.setState({
            recipients
        })
    };

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className='field-button'
                    endIcon={<SendIcon/>}
                    onClick={this.handleClickOpen}>
                    Share
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">{`Share ${this.props.field.name}`}</DialogTitle>
                    <DialogContent>
                        <ChoiceOptionList setOptions={this.setRecipients}
                                          choiceOptions={this.state.recipients}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} className="form-item-link">
                            Close
                        </Button>
                        <Button onClick={this.handleAgree} className="form-item-link" autoFocus>
                            Share
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
                        id="alert-dialog-title">{"Result"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.response}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} className="form-item-link">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ShareField