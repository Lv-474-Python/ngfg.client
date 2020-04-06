import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {DateTimePicker} from '@material-ui/pickers'
import Typography from "@material-ui/core/Typography";

import './ShareGroupAndUser.css'
import UsersList from "./UsersList";
import GroupSelect from "./GroupSelect"


class ShareGroupAndUser extends Component {

    state = {
        fromDate: null,
        toDate: null,
        users: [],
        selectedGroups: [],
        toDateError: false,
        toDateHelperText: ""
    };

    handleFromDate = (fromDate) => {
        if (this.state.toDate && fromDate) {
            let diff = (fromDate.getTime() - this.state.toDate.getTime()) / 1000 / 60;
            let diffMinutes = Math.abs(Math.round(diff));
            if (diffMinutes < 5 || this.state.toDate < fromDate) {
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
            let diff = (this.state.fromDate.getTime() - toDate.getTime()) / 1000 / 60;
            let diffMinutes = Math.abs(Math.round(diff));
            console.log(diffMinutes < 5, toDate < this.state.fromDate)
            if (diffMinutes < 5 || toDate < this.state.fromDate) {
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

    setUsers = (users) => {
        this.setState({users},
            () => this.props.handleUsers(this.state.users))
    };

    setSelectedGroups = (selectedGroups) => {
        this.setState({selectedGroups},
            () => this.props.handleSelectedGroups(this.state.selectedGroups))
    };

    render() {
        return (
            <div className='group-and-users-token'>
                <div className="user-select">
                    <Typography style={{width: '100%'}}>
                        Users
                    </Typography>
                    <UsersList users={this.state.users}
                               setUsers={this.setUsers}/>

                </div>

                <div className="group-select">
                    <GroupSelect groups={this.props.groups}
                                 setSelectedGroups={this.setSelectedGroups}/>
                </div>

                <div className="date-select">
                    <div className="date-picker">
                        <DateTimePicker label="From"
                                        disablePast
                                        inputVariant='outlined'
                                        value={this.state.fromDate}
                                        onChange={this.handleFromDate}
                                        clearable
                                        showTodayButton/>
                    </div>

                    <div className="date-picker">
                        <DateTimePicker label="To"
                                        disablePast
                                        inputVariant='outlined'
                                        value={this.state.toDate}
                                        onChange={this.handleToDate}
                                        error={this.state.toDateError}
                                        helperText={this.state.toDateHelperText}
                                        clearable
                                        strictCompareDates
                                        showTodayButton/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ShareGroupAndUser);