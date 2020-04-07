import React, {Component} from 'react';

import {FormControl, FormControlLabel, Switch} from "@material-ui/core";



class IsStrict extends Component {
    render() {
        return (
            <FormControl component="fieldset">
                <FormControlLabel
                    checked={this.props.value || false}
                    control={<Switch color="primary"/>}
                    label={this.props.strict}
                    labelPlacement="end"
                    onChange={this.props.onChange}
                />
            </FormControl>
        );
    }
}

export default IsStrict;
