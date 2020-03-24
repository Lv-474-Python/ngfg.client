import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

import './FieldNumberPass.scss'


class FieldNumberPass extends Component {

    getRestrictions = () => {
        let restrictions = "Answer must be number.";
        const { field } = this.props.formField;

        if (field.isStrict) {
            restrictions += " Integers only."
        }

        const { range } = field;
        if (range.min) {
            restrictions += ` Greater than ${range.min}.`
        }
        if (range.max) {
            restrictions += ` Less than ${range.max}.`
        }

        return restrictions
    }

    validateAnswer = (answer) => {
        if (!isFinite(answer)) {
            return false;
        }

        const { field } = this.props.formField;
        if (field.isStrict && !Number.isInteger(+answer)) {
            return false;
        }

        const { range } = field;
        if (range.min && answer < range.min) {
            return false;
        }
        if (range.min && answer > range.max) {
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
            <div className='field-number-pass'>

                <div className='field-number-pass__question'>
                    {this.props.formField.question}
                </div>

                <TextField className="field-number-pass__input"
                           label="Your answer"
                           //    type="number"
                           helperText={restrictions}
                           onChange={this.onChange}
                           error={ !this.props.isValid }
                           //    required
                />

            </div>
        );
    }
}

export default FieldNumberPass;
