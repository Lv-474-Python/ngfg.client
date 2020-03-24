import React, { Component } from 'react';

import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';

import './FieldCheckboxPass.scss'


class FieldCheckboxPass extends Component {
    constructor(props) {
        super(props);

        const stateOptions = this.getStateOptions();

        this.state = {
            ...stateOptions,
            pickedOptions: []
        };
    }

    getStateOptions = () => {
        let state = {};
        const options = this.props.formField.field.choiceOptions;
        for(let i = 0; i < options.length; ++i) {
            state[options[i]] = false;
        }
        return state;
    }


    getOptions = () => {
        let optionsComponents = [];
        let options = this.props.formField.field.choiceOptions

        for (let i = 0; i < options.length; ++i) {
            const option = options[i];
            optionsComponents.push(
                <FormControlLabel key={i}
                                  control={
                                    <Checkbox className="field-checkbox-pass__checkbox-item"
                                              checked={this.state[option]} 
                                              onChange={this.onChange} 
                                              name={option} 
                                              
                                    />
                                  }
                                  label={option}
                />
            )
        }

        return optionsComponents;
    }

    validateAnswer = () => {
        let range = this.props.formField.field['range'];
        if (!range) {
            return true;
        }

        if (range.min && this.state.pickedOptions.length < range.min) {
            return false
        }
        if (range.max && this.state.pickedOptions.length > range.max) {
            return false
        }

        return true;
    }

    handlePickedOptions = (checked, value, pickedOptions) => {
        if (checked) {
            pickedOptions.push(value);
        } else {
            let index = pickedOptions.indexOf(value);
            if (index !== -1) {
                pickedOptions.splice(index, 1)
            }
        }
        return pickedOptions;
    }

    onChange = (event) => {
        // хз по форматуванню
        let pickedOptions = this.handlePickedOptions(
            event.target.checked,
            event.target.name,
            this.state.pickedOptions
        );


        this.setState({
            [event.target.name]: event.target.checked,
            pickedOptions: pickedOptions
        }, () => {
            const isValid = this.validateAnswer();
            console.log(isValid);

            this.props.setAnswer(this.props.index, this.state.pickedOptions)
            this.props.setIsValid(this.props.index, isValid);

            console.log(this.state);
        });
    }

    getRestrictions = () => {
        let range = this.props.formField.field['range'];
        if (!range) {
            return "";
        }

        let restrictions = "Pick";
        if (range.min) {
            restrictions += ` from ${range.min}`
        }
        if (range.max) {
            restrictions += ` to ${range.max}`
        }
        return restrictions;
    }


    render() {
        const restrictions = this.getRestrictions();

        return (
            <div className='field-checkbox-pass'>

                <div className='field-checkbox-pass__question'>
                    {this.props.formField.question}
                </div>

                <FormControl component="fieldset"
                             className="field-checkbox-pass__input"
                             error={ !this.props.isValid }>
                             {/* required> */}
                    <FormLabel component="legend"
                               className="field-checkbox-pass__input__help">
                        {restrictions}
                    </FormLabel>
                    <FormGroup>
                        {this.getOptions()}
                    </FormGroup>
                </FormControl>

            </div>
        );
    }
}

export default FieldCheckboxPass;
