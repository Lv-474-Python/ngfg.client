import React, {Component} from 'react'
import {TextField} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import "./UsersList.css"

class UsersList extends Component {
    state = {
        count: 1,
        values: []
    };

    onChange = (event, index) => {
        let values = this.props.users;
        values[index] = event.target.value;
        if (values[index] === "") {
            values.splice(index, 1);
        }

        let count = values.length + 1;

        this.setState({
            values, count
        }, () => {
            this.props.setUsers(this.state.values);
        });

    };

    render() {
        return (
            <div className='user-list'>
                {
                    [...Array(this.state.count).keys()].map(index =>
                        <TextField label=""
                                   className='text-field'
                                   placeholder='User email'
                                   inputProps={{
                                       'pattern': '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
                                   }}
                                   type='email'
                                   key={index}
                                   value={this.props.users[index] || ""}
                                   onChange={(event) => this.onChange(event, index)}
                        />
                    )
                }
            </div>
        )
    }
}

export default withRouter(UsersList);