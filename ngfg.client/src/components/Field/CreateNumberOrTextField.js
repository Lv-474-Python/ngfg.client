import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import SelectFieldType from './Restrictions/SelectFieldType';
import IsStrict from './Restrictions/IsStrict';
import Range from './Restrictions/Range';
import ChoiceOptionList from './Restrictions/ChoiceOptionList';
import {TextField} from "@material-ui/core";


class CreateNumberOrTextField extends Component {
    state = {
        "name": undefined,
        "fieldType": this.props.fieldType,
        "isStrict": false,
        "range_min": undefined,
        "range_max": undefined,
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleChangeFieldType = (event) => {
        this.setState({
            fieldType: event.target.value
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

    setOptions = (choiceOptions) => {
        this.setState({
            choiceOptions
        })
    };

    sendData = (event) => {
        console.log(event.target);
        console.log(this.state);
        const field = {
            name: this.state.name,
            fieldType: this.state.fieldType,
            isStrict: this.state.isStrict,
            range: {min: this.state.range_min, max: this.state.range_max}
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
                <IsStrict onChange={this.handleStrictChange}
                          value={this.state.isStrict}
                />
                <Range onChangeMin={this.handleRangeMinChange}
                       onChangeMax={this.handleRangeMaxChange}
                       maxValue={this.state.range_max}
                       minValue={this.state.range_min}
                />

                {/*{*/}
                {/*    [4, 6].includes(this.state.fieldType) &&*/}
                {/*    <ChoiceOptionList setOptions={this.setOptions}*/}
                {/*                      choiceOptions={this.state.choiceOptions}*/}
                {/*    />*/}
                {/*}*/}
                <div>
                    <Button onClick={this.sendData}>
                        Send
                    </Button>
                </div>
            </div>

        );
    }
}

export default CreateNumberOrTextField;
