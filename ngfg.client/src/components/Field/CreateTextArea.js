import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";


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
        axios.post('http://ngfg.com:8000/api/v1/fields/', {...field}, {withCredentials: true})
            .then(res => {
                    console.log(res);
                    console.log(res.data);
                }
            )
            .catch(error => {
                    console.log(error);
                }
            );
    }
    ;

    render() {
        console.log('this.state');
        console.log(this.state);
        return (
            <div>
                <TextField label="Enter Form Name:"
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
