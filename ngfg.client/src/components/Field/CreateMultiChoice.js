import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Range from './Restrictions/Range';
import ChoiceOptionList from './Restrictions/ChoiceOptionList';
import {TextField} from "@material-ui/core";

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class CreateMultiChoice extends Component {
    state = {
        "name": undefined,
        "fieldType": this.props.fieldType,
        "range_min": undefined,
        "range_max": undefined,
        "choiceOptions": []
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

    sendData = () => {
        var field = {
            name: this.state.name,
            fieldType: this.state.fieldType,
            choiceOptions: this.state.choiceOptions
        };
        if (this.state.fieldType === 6) {
            field.range = {min: this.state.range_min, max: this.state.range_max}
        }
        axios.post(`${API_URL}/${API_VERSION}/fields/`, {...field}, {withCredentials: true})
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

                {[6].includes(this.state.fieldType) && <Range onChangeMin={this.handleRangeMinChange}
                                                              onChangeMax={this.handleRangeMaxChange}
                                                              maxValue={this.state.range_max}
                                                              minValue={this.state.range_min}
                />}

                <ChoiceOptionList setOptions={this.setOptions}
                                  choiceOptions={this.state.choiceOptions}
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

export default CreateMultiChoice;
