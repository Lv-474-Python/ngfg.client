import React, {Component} from 'react';


import TextField from '@material-ui/core/TextField';


class Range extends Component {

    render() {
        let rangeHelper = {};
        if (this.props.fieldType === 1) {
            rangeHelper = {"min": "Min allowed value", "max": "Max allowed value"};
        }
        if (this.props.fieldType === 2) {
            rangeHelper = {"min": "Min allowed characters", "max": "Max allowed characters"};
        }
        if (this.props.fieldType === 6) {
            rangeHelper = {"min": "Min needed selected options", "max": "Max allowed selected options"};
        }

        let rangeMinError = false;
        let rangeMaxError = false;
        if (this.props.fieldType === 1) {
            if (this.props.minValue > 2147483647 || this.props.minValue < -2147483648) {
                rangeMinError = "min must be less than 2147483647 and greater than -2147483648"
            }
            if (this.props.maxValue > 2147483648 || this.props.maxValue < -2147483647) {
                rangeMaxError = "max must be less than 2147483647 and greater than -2147483648"
            }
        }
        if (this.props.fieldType === 2) {
            if (this.props.minValue > 255 || this.props.minValue < 0) {
                rangeMinError = "min must be less than 255 and greater than 0"
            }
            if (this.props.maxValue > 255 || this.props.maxValue < 0) {
                rangeMaxError = "max must be less than 255 and greater than 0"
            }
        }

        if (this.props.minValue > this.props.maxValue) {
                rangeMinError = "min must be less than max";
            }


        return (
            <div className="create-field-range-container">
                <TextField
                    label="From"
                    type="number"
                    value={this.props.minValue == null ? "" : this.props.minValue}
                    onChange={this.props.onChangeMin}
                    className="create-field-range"
                    variant="outlined"
                    helperText={rangeMinError ? rangeMinError : rangeHelper["min"]}
                    error={rangeMinError}
                />
                <TextField
                    label="To"
                    type="number"
                    value={this.props.maxValue == null ? "" : this.props.maxValue}
                    onChange={this.props.onChangeMax}
                    className="create-field-range"
                    variant="outlined"
                    helperText={rangeMaxError ? rangeMaxError : rangeHelper["max"]}
                    error={rangeMaxError}
                />
            </div>
        );
    }
}

export default Range;
