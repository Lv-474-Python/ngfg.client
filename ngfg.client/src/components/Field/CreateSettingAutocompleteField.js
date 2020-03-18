import React, {Component} from 'react';
import axios from 'axios';

import SettingAutocomplete from './Restrictions/SettingAutocomplete'

import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";


class CreateSettingAutocompleteField extends Component {
    state = {
        "name": undefined,
        "fieldType": 5,
        "settingAutocomplete_dataUrl": undefined,
        "settingAutocomplete_sheet": undefined,
        "settingAutocomplete_fromRow": undefined,
        "settingAutocomplete_toRow": undefined
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleDataURL = (event) => {
        this.setState({
            settingAutocomplete_dataUrl: event.target.value
        })
    };

    handleSheet = (event) => {
        this.setState({
            settingAutocomplete_sheet: event.target.value
        })
    };

    handleFromRow = (event) => {
        this.setState({
            settingAutocomplete_fromRow: event.target.value
        })
    };

    handleToRow = (event) => {
        this.setState({
            settingAutocomplete_toRow: event.target.value
        })
    };

    sendData = () => {
        const field = {
            name: this.state.name,
            fieldType: this.state.fieldType,
            settingAutocomplete: {
                dataUrl: this.state.settingAutocomplete_dataUrl,
                sheet: this.state.settingAutocomplete_sheet,
                fromRow: this.state.settingAutocomplete_fromRow,
                toRow: this.state.settingAutocomplete_toRow
            }
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
    };

    render() {
        console.log('this.state');
        console.log(this.state);
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
