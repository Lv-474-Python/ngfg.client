import React, {Component} from 'react';
import axios from 'axios';

import EmailList from './AdditionalComponent/EmailList';

import {FormGroup, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {API_URL, API_VERSION} from '../../constants';


class GroupCreation extends Component {
    state = {
        "name": undefined,
        "usersEmails": []

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

    sendData = () => {
        const group = {
            name: this.state.name,
            usersEmails: this.state.usersEmails
        };
        axios.post(`${API_URL}/${API_VERSION}/groups/`, {...group},
            {withCredentials: true})
            .then(res => {
                    this.props.setResponse("Group created");
                    this.props.getData();
                }
            )
            .catch(error => {
                let response = error.response.data.message;
                if (response.is_exist) {
                    // response = response.updatedName._schema.toString();
                    response = response.is_exist.toString();
                }
                if (response.usersEmails)
                {
                    response = "Not a valid email address."
                }
                this.props.setResponse(response);
                }
            );
        this.props.handleAgree();
    };

    render() {
        return (
            <div>
                <FormGroup className='group-create-name'>
                    <TextField label="Group name"
                               placeholder="Input name"
                               type="text"
                               onChange={this.handleNameChange}
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