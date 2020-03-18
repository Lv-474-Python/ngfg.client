import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Typography from '@material-ui/core/Typography'

class FormStatus extends Component {
    render() {
        return (
            <Typography variant="inherit"
                        component="p"
                        className='form-item-content'>
                Status: {this.props.published ? "Published": "Draft"}
            </Typography>
        );
    }
}

export default withRouter(FormStatus);