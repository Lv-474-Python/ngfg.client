import React, {Component} from 'react';
import axios from 'axios';

import CreateOrUpdateActions from './AdditionalComponents/CreateOrUpdateActions'
import IsStrict from './Restrictions/IsStrict';
import Range from './Restrictions/Range';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";


const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class CreateNumberOrTextField extends Component {
    state = {
        "name": undefined,
        "fieldType": this.props.fieldType,
        "isStrict": false,
        "range_min": undefined,
        "range_max": undefined
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleStrictChange = (event) => {
        console.log(event.target);
        this.setState({
            isStrict: event.target.checked
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

    sendData = () => {
        const field = {
            name: this.state.name,
            fieldType: this.state.fieldType,
            isStrict: this.state.isStrict,
            range: {min: this.state.range_min, max: this.state.range_max}
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
            isStrict: this.state.isStrict
        };
        if (this.state.initField.name !== this.state.name) {
            field.updatedName = this.state.name
        }
        if (this.state.initField.range &&
            this.state.range_min == null && this.state.range_max == null) {
            field.deleteRange = true
        } else {
            field.range = {min: this.state.range_min, max: this.state.range_max}
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
                    }
                    ;
                    this.props.setResponse(response);

                }
            );


        this.props.handleAgree();
    };

    componentDidMount() {
        if (this.props.isUpdate) {
            let initField = {...this.props.field}
            this.setState({
                name: this.props.field.name,
                isStrict: this.props.field.isStrict,
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
    }

    render() {
        let strict;
        if (this.props.fieldType === 1) {
            strict = "Only integers"
        }
        if (this.props.fieldType === 2) {
            strict = "Only letters"
        }
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
                <div>
                    <Typography className='create-field-range-typo'
                                variant="inherit"
                                component="p">
                        Range:
                    </Typography>
                    <Range onChangeMin={this.handleRangeMinChange}
                           onChangeMax={this.handleRangeMaxChange}
                           maxValue={this.state.range_max}
                           minValue={this.state.range_min}
                           fieldType={this.props.fieldType}
                    />
                </div>
                <div className="create-field-strict">
                    <IsStrict onChange={this.handleStrictChange}
                              value={this.state.isStrict}
                              strict={strict}
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

export default CreateNumberOrTextField;
