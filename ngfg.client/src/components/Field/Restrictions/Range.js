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
        return (
            <div className="create-field-range-container">
                <TextField
                    label="From"
                    type="number"
                    value={this.props.minValue == null ? "" : this.props.minValue}
                    onChange={this.props.onChangeMin}
                    className="create-field-range"
                    variant="outlined"
                    helperText={rangeHelper["min"]}
                />
                <TextField
                    label="To"
                    type="number"
                    value={this.props.maxValue == null ? "" : this.props.maxValue}
                    onChange={this.props.onChangeMax}
                    className="create-field-range"
                    variant="outlined"
                    helperText={rangeHelper["max"]}
                />
            </div>
        );
    }
}

export default Range;
