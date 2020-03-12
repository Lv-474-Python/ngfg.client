import React, { Component } from 'react';


import TextField from '@material-ui/core/TextField';




class IsStrict extends Component {
    render() {
        return (
            <div>
                <TextField
                    label="From"
                    type="number"
                    value={this.props.range_min}
                    onChange={this.props.onChangeMin}
                />
                <TextField
                    label="To"
                    type="number"
                    value={this.props.range_max}
                    onChange={this.props.onChangeMax}
                />
            </div>
        );
    }
}

export default IsStrict;
