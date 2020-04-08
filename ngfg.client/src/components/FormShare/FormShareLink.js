import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {DateTimePicker} from "@material-ui/pickers";
import {
    TextField,
    Typography,
    FormControl
} from "@material-ui/core";

import "./FormShareLink.css"

import {MIN_DIFF_BETWEEN_TO_AND_FROM_DATE, MILLISECONDS, SECONDS} from '../../constants'


class FormShareLink extends Component {
    state = {
        formShareLink: "",
        fromDate: null,
        toDate: null,
        toDateError: false,
        toDateHelperText: ""
    };

    handleClose = () => {
        this.setState({open: false})
    };

    onChange = (event) => {
        let formShareLink = event.target.value;
        this.setState({formShareLink},
            () => this.props.handleFormShare(this.state.formShareLink))
    };

    handleFromDate = (fromDate) => {
        if (this.state.toDate && fromDate) {
            let diff = (fromDate.getTime() - this.state.toDate.getTime()) / MILLISECONDS / SECONDS;
            let diffMinutes = Math.abs(Math.round(diff));
            if (diffMinutes < MIN_DIFF_BETWEEN_TO_AND_FROM_DATE || this.state.toDate < fromDate) {
                this.setState({
                        fromDate: fromDate,
                        toDateError: true,
                        toDateHelperText: "Min diff between To and From - 5 min"
                    },
                    () => this.props.handleFromDate(this.state.fromDate))
            } else {
                this.setState({
                        fromDate: fromDate,
                        toDateError: false,
                        toDateHelperText: ""
                    },
                    () => this.props.handleFromDate(this.state.fromDate))
            }
        } else {
            this.setState({
                    fromDate: fromDate,
                    toDateError: false,
                    toDateHelperText: ""
                },
                () => this.props.handleFromDate(this.state.fromDate))
        }

    };

    handleToDate = (toDate) => {
        if (this.state.fromDate && toDate) {
            let diff = (this.state.fromDate.getTime() - toDate.getTime()) / MILLISECONDS / SECONDS;
            let diffMinutes = Math.abs(Math.round(diff));
            if (diffMinutes < MIN_DIFF_BETWEEN_TO_AND_FROM_DATE || toDate < this.state.fromDate) {
                this.setState({
                        toDate: toDate,
                        toDateError: true,
                        toDateHelperText: "Min diff between To and From - 5 min"
                    },
                    () => this.props.handleToDate(this.state.toDate))
            } else {
                this.setState({
                        toDate: toDate,
                        toDateError: false,
                        toDateHelperText: ""
                    },
                    () => this.props.handleToDate(this.state.toDate))
            }
        } else {
            this.setState({
                    toDate: toDate,
                    toDateError: false,
                    toDateHelperText: ""
                },
                () => this.props.handleToDate(this.state.toDate))
        }
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
                               placeholder='Form share link'
                               fullWidth={true}
                               onChange={this.onChange}
                               value={this.props.formShareLink}
                               type='text'/>

                    <div className="date-select-link">
                        <div className="date-picker-link">
                            <DateTimePicker label="From"
                                            disablePast
                                            inputVariant='outlined'
                                            value={this.state.fromDate}
                                            onChange={this.handleFromDate}
                                            clearable
                                            showTodayButton/>
                        </div>

                        <div className="date-picker-link">
                            <DateTimePicker label="To"
                                            disablePast
                                            inputVariant='outlined'
                                            value={this.state.toDate}
                                            onChange={this.handleToDate}
                                            error={this.state.toDateError}
                                            helperText={this.state.toDateHelperText}
                                            clearable
                                            showTodayButton/>
                        </div>
                    </div>
                </FormControl>
            </div>
        )
    }
}

export default withRouter(FormShareLink);