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
        selectedGroups: []
    };

    handelFromDate = (fromDate) => {
        this.setState({fromDate},
            () => this.props.handleFromDate(this.state.fromDate))
    };

    handelToDate = (toDate) => {
        this.setState({toDate},
            () => this.props.handleToDate(this.state.toDate))
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
                                        onChange={this.handelFromDate}
                                        clearable
                                        showTodayButton/>
                    </div>

                    <div className="date-picker">
                        <DateTimePicker label="To"
                                        disablePast
                                        inputVariant='outlined'
                                        value={this.state.toDate}
                                        onChange={this.handelToDate}
                                        clearable
                                        showTodayButton
                                        cancelLabel={<p className='label'>Cancel</p>}
                                        okLabel={<p className='label'>Ok</p>}
                                        clearLabel={<p className='label'>Clear</p>}
                                        todayLabel={<p className='label'>Today</p>}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(ShareGroupAndUser);