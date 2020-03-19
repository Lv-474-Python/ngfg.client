import React, {Component} from 'react';
import axios from 'axios';

import SettingAutocomplete from './Restrictions/SettingAutocomplete'

import Button from '@material-ui/core/Button';
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

    render() {
        return (
            <div>
                <TextField label="Enter field name:"
                           type="text"
                           onChange={this.handleNameChange}
                />
                <SettingAutocomplete onChangeDataURL={this.handleDataURL}
                                     onChangeSheet={this.handleSheet}
                                     onChangeFromRow={this.handleFromRow}
                                     onChangeToRow={this.handleToRow}
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

export default CreateSettingAutocompleteField;
