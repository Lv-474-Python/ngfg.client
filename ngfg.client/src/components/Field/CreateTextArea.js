import React, {Component} from 'react';
import axios from 'axios';

import CreateOrUpdateActions from './AdditionalComponents/CreateOrUpdateActions'
import TextField from '@material-ui/core/TextField';

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class CreateTextArea extends Component {
    state = {
        "name": undefined,
        "fieldType": 3,
        "nameFieldErrors": false,
        "isValid": false
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    validateValues = (name) => {
        let valid = true;
        if (name === "" || name === undefined) {
            valid = false;
            this.setState({nameFieldErrors: {missed_data: "Missed data"}});
        }
        return valid
    };

    sendData = () => {
        const field = {
            name: this.state.name,
            fieldType: this.state.fieldType
        };
        let isValid = this.validateValues(field.name);

        if (isValid === true) {
            axios.post(`${API_URL}/${API_VERSION}/fields/`, {...field}, {withCredentials: true})
                .then(res => {
                        alert('Field created');
                        this.props.getData();
                        this.props.handleClose();
                    }
                )
                .catch(error => {
                        let response = error.response.data.message;
                        this.setState({nameFieldErrors: {...response}});
                    }
                );
        }
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
        let missedDataName = false;
        if (this.state.name === undefined || this.state.name === "") {
            missedDataName = this.state.nameFieldErrors.missed_data;
        }
        let isExistError = false;
        if (this.state.nameFieldErrors.is_exist !== undefined) {
            isExistError = this.state.nameFieldErrors.is_exist;
        }

        return (
            <div className="create-field-windows-content">
                <div className="create-field-name">
                    <TextField label="Field name"
                               placeholder="Enter field name"
                               type="text"
                               value={this.state.name || ""}
                               onChange={this.handleNameChange}
                               error={missedDataName || isExistError}
                               helperText={missedDataName || isExistError}
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
