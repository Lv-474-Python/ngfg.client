import React, {Component} from 'react';
import './Field.css'


import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CreateNumberOrTextField from './CreateNumberOrTextField'
import CreateTextArea from './CreateTextArea'
import CreateMultiChoice from './CreateMultiChoice'
import CreateSettingAutocompleteField from './CreateSettingAutocompleteField'


class UpdateField extends Component {

    state = {
        open: false,
        response: undefined,
        openResponse: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false, openResponse: false},
            () => {
                this.props.handleUpdated(
                    this.state.response === "Updated successfully"
                );
            });
    };

    handleAgree = () => {
        this.setState({open: false, openResponse: true});
    };

    setResponse = (response) => {
        this.setState({response});
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className='field-button'
                    endIcon={<EditIcon/>}
                    onClick={this.handleClickOpen}>
                    Edit
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth={"sm"}
                    fullWidth={true}
                >
                    <DialogTitle
                        id="alert-dialog-title">{`Edit ${this.props.field.name}`}</DialogTitle>
                    <DialogContent>
                        {
                            [1, 2].includes(this.props.field.fieldType) &&
                            <CreateNumberOrTextField fieldType={this.props.field.fieldType}
                                                     field={this.props.field}
                                                     handleUpdated={this.props.handleUpdated}
                                                     handleClose={this.handleClose}
                                                     handleAgree={this.handleAgree}
                                                     setResponse={this.setResponse}
                                                     isUpdate={true}
                            />
                        }
                        {
                            this.props.field.fieldType === 3 &&
                            <CreateTextArea field={this.props.field}
                                            handleUpdated={this.props.handleUpdated}
                                            handleClose={this.handleClose}
                                            handleAgree={this.handleAgree}
                                            setResponse={this.setResponse}
                                            isUpdate={true}
                            />
                        }
                        {
                            [4, 6].includes(this.props.field.fieldType) &&
                            <CreateMultiChoice fieldType={this.props.field.fieldType}
                                               field={this.props.field}
                                               handleUpdated={this.props.handleUpdated}
                                               handleClose={this.handleClose}
                                               handleAgree={this.handleAgree}
                                               setResponse={this.setResponse}
                                               isUpdate={true}
                            />
                        }
                        {
                            this.props.field.fieldType === 5 &&
                            <CreateSettingAutocompleteField field={this.props.field}
                                                            handleUpdated={this.props.handleUpdated}
                                                            handleClose={this.handleClose}
                                                            handleAgree={this.handleAgree}
                                                            setResponse={this.setResponse}
                                                            isUpdate={true}
                            />
                        }
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
        )
    }
}

export default UpdateField;
