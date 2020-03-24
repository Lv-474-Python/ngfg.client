import React, { Component } from 'react';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import './FieldAutocompletePass.scss'


const FONT_WEIGHT_NORMAL = 400;
const FONT_WEIGHT_BOLD = 700;


class FieldAutocompletePass extends Component {
    renderInput = (params) => {
        return (
            <TextField {...params} 
                       label="Your answer" 
                       margin="normal"
                       error={ !this.props.isValid }
            />
        );
    }

    renderOption = (option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);

        return (
            <div>
                {parts.map((part, index) => (
                    <span key={index} 
                          style={{ 
                              fontWeight: part.highlight ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL
                          }}>
                        {part.text}
                    </span>
                ))}
            </div>
        );
    }

    validateAnswer = (answer) => {
        return Boolean(answer);
    }

    onChange = (event, value) => {
        const isValid = this.validateAnswer(value);
        this.props.setAnswer(this.props.index, value)
        this.props.setIsValid(this.props.index, isValid);
    }

    render() {
        return (
            <div className='field-auto-pass'>

                <div className='field-auto-pass__question'>
                    {this.props.formField.question}
                </div>

                <Autocomplete options={this.props.formField.field.values}
                              renderInput={this.renderInput}
                              renderOption={this.renderOption}
                              onChange={this.onChange}
                />

            </div>
        );
    }
}

export default FieldAutocompletePass;
