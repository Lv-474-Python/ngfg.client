import React, { Component } from 'react';

import { TextareaAutosize } from '@material-ui/core';

import './FieldTextareaPass.scss'


const TEXTAREA_ROWS_MIN = 4;


class FieldTextareaPass extends Component {

    validateAnswer = (answer) => {
        return Boolean(answer);
    }

    onChange = (event) => {
        const answer = event.target.value.trim();
        const isValid = this.validateAnswer(answer);
        this.props.setAnswer(this.props.index, answer)
        this.props.setIsValid(this.props.index, isValid);
    }

    render() {
        let textareaClassName = "field-textarea-pass__input";
        if (!this.props.isValid) {
            textareaClassName += ` ${textareaClassName}__error`
        }

        return (
            <div className='field-textarea-pass'>

                <div className='field-textarea-pass__question'>
                    {this.props.formField.question}
                </div>

                <TextareaAutosize className={textareaClassName}
                                  rowsMin={TEXTAREA_ROWS_MIN}
                                  placeholder="Your answer"
                                  onChange={this.onChange}
                />
            </div>
        );
    }
}

export default FieldTextareaPass;
