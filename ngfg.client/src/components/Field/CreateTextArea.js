import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class CreateTextArea extends Component {
    state = {
        "name": undefined,
        "fieldType": 3
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    sendData = () => {
        const field = {
            name: this.state.name,
            fieldType: this.state.fieldType
        };
        axios.post(`${API_URL}/${API_VERSION}/fields/`, {...field}, {withCredentials: true})
            .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert('Field created');
                    this.props.getData();
                    this.props.handleClose();
                }
            )
            .catch(error => {
                    console.log(error);
                    alert('Field was not created');
                    this.props.handleClose();
                }
            );
    }
    ;

    render() {
        return (
            <div>
                <TextField label="Enter field name:"
                           type="text"
                           onChange={this.handleNameChange}
                />
                <div>
                    <Button onClick={this.sendData}>
                        Send
                    </Button>
                </div>
            </div>

        );
    }
}

export default CreateTextArea;
