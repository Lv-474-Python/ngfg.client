import React, {Component} from 'react';
import axios from 'axios';

import EmailList from './AdditionalComponent/EmailList';

import {FormGroup, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class GroupCreation extends Component {
    state = {
        "name": undefined,
        "usersEmails": [],
        "nameFieldErrors": false,
        "isValid": false
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    setEmails = (usersEmails) => {
        this.setState({
            usersEmails
        })
    };

    validateValues = (name) => {
        let valid = true;
        if (name === "" || name === undefined) {
            valid = false;
            this.setState({nameFieldErrors: {missed_data: "Missed data"}});
        }
        return valid;
    };
    sendData = () => {
        const group = {
            name: this.state.name,
            usersEmails: this.state.usersEmails
        };
        let isValid = this.validateValues(group.name);
        if (isValid === true) {
            axios.post(`${API_URL}/${API_VERSION}/groups/`, {...group},
                {withCredentials: true})
                .then(res => {
                        this.props.setResponse("Group created");
                        this.props.getData();
                        this.props.handleAgree();
                    }
                )
                .catch(error => {
                        let response = error.response.data.message;
                        this.setState({nameFieldErrors: {...response}})
                    }
                );
        }

    };

    render() {
        let missedDataName = false;
        if (this.state.name === undefined || this.state.name === "") {
            missedDataName = this.state.nameFieldErrors.missed_data;
        }
        let isExistError = false;
        if (this.state.nameFieldErrors.is_exist !== undefined) {
            isExistError = this.state.nameFieldErrors.is_exist;
        }
        return (
            <div>
                <FormGroup className='group-create-name'>
                    <TextField label="Group name"
                               placeholder="Input name"
                               type="text"
                               onChange={this.handleNameChange}
                               error={missedDataName || isExistError}
                               helperText={missedDataName || isExistError}
                    />
                </FormGroup>
                <Typography className='mail-typo'
                            variant="inherit"
                            component="p">
                    Emails:
                </Typography>
                <EmailList setEmails={this.setEmails}
                           emails={this.state.usersEmails}
                />
                <div className="group-btn-position">
                    <Button onClick={this.sendData} className="group-creation-btn">
                        Send
                    </Button>
                </div>
            </div>

        );
    }
}

export default GroupCreation;