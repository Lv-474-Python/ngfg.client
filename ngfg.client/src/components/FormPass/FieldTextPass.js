import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import './FieldTextPass.scss'


class FieldTextPass extends Component {
    getRestrictions = () => {
        let restrictions = "";
        const { field } = this.props.formField;

        if (field.isStrict) {
            restrictions += "Only alphabetical characters."
        }

        const { range } = field;
        if (Number.isFinite(range.min)) {
            restrictions += ` Min number of characters: ${range.min}.`
        }
        if (Number.isFinite(range.max)) {
            restrictions += ` Max number of characters: ${range.max}.`
        }

        return restrictions
    }

    isAlphabetical = (answer) => {
        return /^[a-zA-Z\s]+$/.test(answer)
    }

    validateAnswer = (answer) => {
        const { field } = this.props.formField;
        if (field.isStrict && !this.isAlphabetical(answer)) {
            return false;
        }

        const { range } = field;
        if (Number.isFinite(range.min) && answer.length < range.min) {
            return false;
        }
        if (Number.isFinite(range.max) && answer.length > range.max) {
            return false;
        }

        return true;
    }

    onChange = (event) => {
        const answer = event.target.value.trim();
        this.props.setAnswer(this.props.index, answer)

        const isValid = this.validateAnswer(answer);
        this.props.setIsValid(this.props.index, isValid);
    }

    render() {
        const restrictions = this.getRestrictions();

        return (
            <div className='field-text-pass'>

                <div className='field-text-pass__question'>
                    {this.props.formField.question}
                </div>

                <TextField className="field-text-pass__input"
                           label="Your answer"
                           helperText={restrictions}
                           onChange={this.onChange}
                           error={ !this.props.isValid }
                />

            </div>
        );
    }
}

export default FieldTextPass;
