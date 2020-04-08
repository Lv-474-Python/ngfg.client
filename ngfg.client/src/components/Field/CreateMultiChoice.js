import React, {Component} from 'react';
import axios from 'axios';

import ChoiceOptionList from './Restrictions/ChoiceOptionList';
import CreateOrUpdateActions from './AdditionalComponents/CreateOrUpdateActions'
import Range from './Restrictions/Range';
import {FormGroup, Typography, TextField} from "@material-ui/core";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';


class CreateMultiChoice extends Component {
    state = {
        "name": undefined,
        "fieldType": this.props.fieldType,
        "range_min": undefined,
        "range_max": undefined,
        "choiceOptions": [],
        "nameFieldErrors": false,
        "isValid": false
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleRangeMaxChange = (event) => {
        this.setState({
            'range_max': event.target.value
        });
        if (event.target.value === "") {
            this.setState({'range_max': undefined});
        }

    };

    handleRangeMinChange = (event) => {
        this.setState({
            'range_min': event.target.value
        });
        if (event.target.value === "") {
            this.setState({'range_min': undefined});
        }
    };

    setOptions = (choiceOptions) => {
        this.setState({
            choiceOptions
        })
    };
    validateValues = (name, range, choiceOptions) => {
        let valid = true;
        if (name === "" || name === undefined) {
            valid = false;
            this.setState({nameFieldErrors: {missed_data: "Missed data"}});
        }
        if (this.state.fieldType === 6) {
            if (range.min > range.max) {
                valid = false;
            }
            if (range.min < 0 || range.max < 0) {
                valid = false;
            }
            if (range.min > choiceOptions.length || range.max > choiceOptions.length){
                valid = false;
            }
        }
        return valid
    }

    sendData = () => {
        var field = {
            name: this.state.name,
            fieldType: this.state.fieldType,
            choiceOptions: this.state.choiceOptions
        };
        if (this.state.fieldType === 6) {
            field.range = {min: this.state.range_min, max: this.state.range_max}
        }

        let isValid = this.validateValues(field.name, field.range, field.choiceOptions);

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
        let initOptions = this.state.initOptions
        let newOptions = this.state.choiceOptions

        let field = {
            addedChoiceOptions: [...newOptions].filter(x => !initOptions.includes(x)),
            removedChoiceOptions: [...initOptions].filter(x => !newOptions.includes(x))
        };
        if (this.state.initField.name !== this.state.name) {
            field.updatedName = this.state.name
        }
        if (this.state.fieldType === 6) {
            if (this.state.initField.range &&
                this.state.range_min == null && this.state.range_max == null) {
                field.deleteRange = true
            } else {
                field.range = {min: this.state.range_min, max: this.state.range_max}
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
                    } else if (response.range) {
                        response = response.range._schema.toString();
                    } else if (response.options_and_range_error) {
                        response = response.options_and_range_error.toString();
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
                choiceOptions: this.props.field.choiceOptions,
                initOptions: [...this.props.field.choiceOptions],
                initField
            })
            if (this.props.field.range) {
                if (this.props.field.range.min !== null) {
                    this.setState({range_min: this.props.field.range.min})
                }
                if (this.props.field.range.max !== null) {
                    this.setState({range_max: this.props.field.range.max})
                }
            }
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
                <div>
                    {[6].includes(this.state.fieldType) && <Typography className='create-field-range-typo'
                                                                       variant="inherit"
                                                                       component="p">
                        Range:
                    </Typography>
                    }
                    {[6].includes(this.state.fieldType) && <Range onChangeMin={this.handleRangeMinChange}
                                                                  onChangeMax={this.handleRangeMaxChange}
                                                                  maxValue={this.state.range_max}
                                                                  minValue={this.state.range_min}
                                                                  fieldType={this.props.fieldType}
                                                                  choiceOptions={this.state.choiceOptions}
                    />}
                </div>
                <FormGroup>
                    <Typography className='create-field-range-typo'
                                variant="inherit"
                                component="p">
                        Options:
                    </Typography>
                    <ChoiceOptionList setOptions={this.setOptions}
                                      choiceOptions={this.state.choiceOptions}
                    />
                </FormGroup>

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

export default CreateMultiChoice;
