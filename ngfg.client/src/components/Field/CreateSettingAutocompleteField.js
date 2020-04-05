import React, {Component} from 'react';
import axios from 'axios';

import CreateOrUpdateActions from './AdditionalComponents/CreateOrUpdateActions'
import SettingAutocomplete from './Restrictions/SettingAutocomplete'
import {TextField} from "@material-ui/core";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class CreateSettingAutocompleteField extends Component {
    state = {
        "name": undefined,
        "fieldType": 5,
        "dataUrl": undefined,
        "sheet": undefined,
        "fromRow": undefined,
        "toRow": undefined
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
        axios.post(`${API_URL}/${API_VERSION}/fields/`, {...field}, {withCredentials: true})
            .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert('Field created');
                    this.props.getData();
                }
            )
            .catch(error => {
                    console.log(error);
                    alert('Field was not created');
                }
            );
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
                console.log(response)
                if (response.updatedName) {
                    response = response.updatedName._schema.toString();
                }
                else if (response.updatedAutocomplete) {
                    response = response.updatedAutocomplete._schema.toString();
                };
                this.props.setResponse(response);
                }
            );
        this.props.setResponse(response);
        this.props.handleAgree();
    };

    componentDidMount () {
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
        return (
            <div>
                <TextField label="Enter field name:"
                           type="text"
                           value={this.state.name || ""}
                           onChange={this.handleNameChange}
                />
                <SettingAutocomplete onChangeDataURL={this.handleDataURL}
                                     onChangeSheet={this.handleSheet}
                                     onChangeFromRow={this.handleFromRow}
                                     onChangeToRow={this.handleToRow}
                                     dataUrl={this.state.dataUrl}
                                     sheet={this.state.sheet}
                                     fromRow={this.state.fromRow}
                                     toRow={this.state.toRow}
                />
                <CreateOrUpdateActions sendData={this.sendData}
                                       sendUpdateData={this.sendUpdateData}
                                       handleClose={this.props.handleClose}
                                       isUpdate={this.props.isUpdate}
                />
            </div>
        );
    }
}

export default CreateSettingAutocompleteField;
