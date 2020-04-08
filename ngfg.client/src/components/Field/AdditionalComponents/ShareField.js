import React, {Component} from "react";
import axios from 'axios';

import '../../Form/Form.css'
import './ShareField.css'
import '../../HomePage/FormItem.scss'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import ChoiceOptionList from "../Restrictions/ChoiceOptionList";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class ShareField extends Component {

    state = {
        fields: [],
        open: false,
        recipients: [],
        response: undefined,
        openResponse: false
    };


    getData = () => {
        axios.get(`${API_URL}/${API_VERSION}/shared_fields`, {
            withCredentials: true,
        })
            .then(res => {
                const fields = res.data.sharedFields.filter( (field) => { 
                    return field.field.name === this.props.field.name
                });
                this.setState({fields})
            })
    }

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
            this.getData();
    };

    unshareField = (userId) => {
        axios
            .delete(`${API_URL}/${API_VERSION}/shared_fields/${this.props.field.id}/user/${userId}`,
                {withCredentials: true,})
            .then(data => { this.getData()})
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, openResponse: false, recipients: []});
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

    componentDidMount = () => {
        this.getData();
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={!this.props.mainpage ? 'field-button': "field-item__buttons__share"}
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
                    <DialogContent className='shared-dialog'>
                        <TableContainer className='shared-table'>
                            <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                    key='Email'
                                    align='left'
                                    >
                                    Email
                                    </TableCell>
                                    <TableCell
                                    key='Unshare'
                                    align='left'
                                    >
                                    Unshare
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.fields.map((field) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={field.user.email}>
                                        <TableCell key={field.user.email} align='left'>
                                            {field.user.email}
                                        </TableCell>
                                        <TableCell key={field.user.id} align='center'>
                                            <IconButton aria-label="delete"
                                                        className='delete-icon'
                                                        onClick={() => {this.unshareField(field.user.id)}}
                                            >
                                                <DeleteIcon className='delete-icon'/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <div className='shared-list'>
                            <p> Recipients emails: </p>
                            <ChoiceOptionList setOptions={this.setRecipients}
                                            choiceOptions={this.state.recipients}
                            />
                        </div>
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