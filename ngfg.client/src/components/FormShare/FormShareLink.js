import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {
    TextField,
    Typography,
    FormControl
} from "@material-ui/core";

import "./FormShareLink.css"


class FormShareLink extends Component {
    state = {
        formShareLink: ""
    };

    handleClose = () => {
        this.setState({open: false})
    };

    onChange = (event) => {
        let formShareLink = event.target.value;
        this.setState({formShareLink},
        () => this.props.handleFormShare(this.state.formShareLink))
    };

    render() {
        return (
            <div>
                <FormControl style={{width: "100%"}}>
                    <Typography className='form-share-dialog-link-text'>
                        Form share link
                    </Typography>
                    <TextField variant='outlined'
                               inputProps={{
                                   readOnly: true
                               }}
                               fullWidth={true}
                               onChange={this.onChange}
                               value={this.state.formShareLink}
                               type='text'/>

                </FormControl>
            </div>
        )
    }
}

export default withRouter(FormShareLink);