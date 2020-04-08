import React, {Component} from 'react';
import axios from 'axios';

import {API_VERSION, API_URL} from '../../constants'
import CreateOrUpdateActions from './AdditionalComponents/CreateOrUpdateActions'
import SettingAutocomplete from './Restrictions/SettingAutocomplete'
import {TextField} from "@material-ui/core";

class CreateSettingAutocompleteField extends Component {
    state = {
        "name": undefined,
        "fieldType": 5,
        "dataUrl": undefined,
        "sheet": undefined,
        "fromRow": undefined,
        "toRow": undefined,
        "nameFieldErrors": false,
        "missedAutocompleteData": {},
        "isValid": false
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleDataURL = (event) => {
        this.setState({
            dataUrl: event.target.value
        })
    };

    handleSheet = (event) => {
        this.setState({
            sheet: event.target.value
        })
    };

    handleFromRow = (event) => {
        this.setState({
            fromRow: event.target.value
        })
    };

    handleToRow = (event) => {
        this.setState({
            toRow: event.target.value
        })
    };
    validateValues = (name, dataUrl, sheet, fromRow, toRow) => {
        let valid = true;
        let missedAutocompleteData = {dataUrl: false, sheet: false, fromRow: false, toRow:false};
        if (name === "" || name === undefined) {
            valid = false;
            this.setState({nameFieldErrors: {missed_data: "Missed data"}});
        }
        if (dataUrl === "" || dataUrl === undefined) {
            valid = false;
            missedAutocompleteData.dataUrl = true;
        }
        if (sheet === "" || sheet === undefined) {
            valid = false;
            missedAutocompleteData.sheet = true;
        }
        if (fromRow === "" || fromRow === undefined) {
            valid = false;
            missedAutocompleteData.fromRow = true;
        }
        if (toRow === "" || toRow === undefined) {
            valid = false;
            missedAutocompleteData.toRow = true;
        }
        this.setState({missedAutocompleteData});
        return valid
    };

    sendData = () => {
        const field = {
            name: this.state.name,
            fieldType: this.state.fieldType,
            settingAutocomplete: {
                dataUrl: this.state.dataUrl,
                sheet: this.state.sheet,
                fromRow: this.state.fromRow,
                toRow: this.state.toRow
            }
        };
        let isValid = this.validateValues(
            field.name,
            field.settingAutocomplete.dataUrl,
            field.settingAutocomplete.sheet,
            field.settingAutocomplete.fromRow,
            field.settingAutocomplete.toRow);

        if (isValid === true) {
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
                        let response = error.response.data.message;
                        this.setState({nameFieldErrors: {...response}});
                    }
                );
        }
    };

    sendUpdateData = () => {
        let response = ""

        let field = {
            updatedAutocomplete: {
                dataUrl: this.state.dataUrl,
                sheet: this.state.sheet,
                fromRow: this.state.fromRow,
                toRow: this.state.toRow
            }
        };
        if (this.state.initField.name !== this.state.name) {
            field.updatedName = this.state.name
        }
        for (let prop in this.state.initField.settingAutocomplete) {
            if (this.state[prop] !== this.state.initField.settingAutocomplete[prop]) {
                field.updatedAutocomplete[prop] = this.state[prop]
            }
        }
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
                    } else if (response.updatedAutocomplete) {
                        response = response.updatedAutocomplete._schema.toString();
                    }
                    ;
                    this.props.setResponse(response);
                }
            );
        this.props.setResponse(response);
        this.props.handleAgree();
    };

    componentDidMount() {
        if (this.props.isUpdate) {
            let initField = {...this.props.field}
            this.setState({
                name: this.props.field.name,
                dataUrl: this.props.field.settingAutocomplete.dataUrl,
                sheet: this.props.field.settingAutocomplete.sheet,
                fromRow: this.props.field.settingAutocomplete.fromRow,
                toRow: this.props.field.settingAutocomplete.toRow,
                initField
            })
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
                <SettingAutocomplete onChangeDataURL={this.handleDataURL}
                                     onChangeSheet={this.handleSheet}
                                     onChangeFromRow={this.handleFromRow}
                                     onChangeToRow={this.handleToRow}
                                     dataUrl={this.state.dataUrl}
                                     sheet={this.state.sheet}
                                     fromRow={this.state.fromRow}
                                     toRow={this.state.toRow}
                                     missedAutocompleteData={this.state.missedAutocompleteData}
                />
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

export default CreateSettingAutocompleteField;
