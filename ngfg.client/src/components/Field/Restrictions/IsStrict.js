import React, {Component} from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


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
