import React, {Component} from 'react';
import axios from 'axios';

import {API_VERSION, API_URL} from '../../constants'
import CreateOrUpdateActions from './AdditionalComponents/CreateOrUpdateActions'
import TextField from '@material-ui/core/TextField';


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
    };

    sendUpdateData = () => {
        let response = ""
        const field = {
            updatedName: this.state.name
        };
        axios.put(`${API_URL}/${API_VERSION}/fields/${this.props.field.id}/`,
            {...field},
            {withCredentials: true})
            .then(res => {
                    this.props.handleUpdated(true);
                    response = "Field updated"
                    this.props.setResponse(response);
                }
            )
            .catch(error => {
                    let response = error.response.data.message;
                    if (response.updatedName) {
                        response = response.updatedName._schema.toString();
                    }
                    this.props.setResponse(response);
                }
            );
        this.props.handleAgree();
    };

    componentDidMount() {
        if (this.props.isUpdate) {
            this.setState({name: this.props.field.name})
        }
    }

    render() {
        return (
            <div className="create-field-windows-content">
                <div className="create-field-name">
                    <TextField label="Field name"
                               placeholder="Enter field name"
                               type="text"
                               value={this.state.name || ""}
                               onChange={this.handleNameChange}
                               fullWidth
                               variant="outlined"
                    />
                </div>
                <div className="field-action-btn-container">
                    <CreateOrUpdateActions sendData={this.sendData}
                                           sendUpdateData={this.sendUpdateData}
                                           handleClose={this.props.handleClose}
                                           isUpdate={this.props.isUpdate}
                    />
                </div>
            </div>

        );
    }
}

export default CreateTextArea;
