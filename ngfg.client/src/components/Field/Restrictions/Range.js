import React, { Component } from 'react';


import TextField from '@material-ui/core/TextField';




class Range extends Component {
    render() {
        return (
            <div className="create-field-range-container">
                <TextField
                    label="From"
                    type="number"
                    value={this.props.minValue == null ? "" : this.props.minValue}
                    onChange={this.props.onChangeMin}
                    className="create-field-range"
                    variant="outlined"
                />
                <TextField
                    label="To"
                    type="number"
                    value={this.props.maxValue == null ? "" : this.props.maxValue}
                    onChange={this.props.onChangeMax}
                    className="create-field-range"
                    variant="outlined"
                />
            </div>
        );
    }
}

export default Range;
