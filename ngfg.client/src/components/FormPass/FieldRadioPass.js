import React, { Component } from 'react';

import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@material-ui/core';

import './FieldRadioPass.scss'


class FieldRadioPass extends Component {
    state = {
        'answer': [null]
    }

    getOptions = () => {
        let optionsComponents = [];
        let options = this.props.formField.field.choiceOptions

        for (let i = 0; i < options.length; ++i) {
            const option = options[i];
            optionsComponents.push(
                <FormControlLabel key={i}
                                  value={option} 
                                  control={
                                    <Radio className="field-radio-pass__radio-item"/>
                                  } 
                                  label={option} 
                />
            )
        }

        return optionsComponents;
    }

    onChange = (event) => {
        const answer = [event.target.value];
        this.setState({ answer });
        this.props.setAnswer(this.props.index, answer)
        this.props.setIsValid(this.props.index, true)
    }

    render() {
        const radioName = this.props.formField.field.name;

        return (
            <div className='field-radio-pass'>

                <div className='field-radio-pass__question'>
                    {this.props.formField.question}
                </div>

                <FormControl component="fieldset"
                             className="field-radio-pass__input">

                    <FormLabel className="field-radio-pass__input__help"
                               error={ !this.props.isValid }>
                        Pick one
                    </FormLabel>

                    <RadioGroup aria-label="gender"
                                name={radioName}
                                value={this.state.answer[0]}
                                onChange={this.onChange}>
                        {this.getOptions()}
                    </RadioGroup>

                </FormControl>

            </div>
        );
    }
}

export default FieldRadioPass;
