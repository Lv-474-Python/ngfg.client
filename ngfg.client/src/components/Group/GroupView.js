import React, { Component } from 'react';
import axios from 'axios';

import GroupItem from './GroupItem';


class GroupView extends Component {
    state = {
        "id": undefined,
        "name": undefined,
        "ownerId": undefined,
        "users": []
    }

    getGroupData = () => {
        axios.get(`http://ngfg.com:8000/api/v1/groups/${this.props.match.params.id}`, {
            withCredentials: true,
        })
            .then(res => {
                const group = res.data;
                console.log(group);
                this.setState({ ...group })
            })
    }

    componentDidMount() {
        this.getGroupData()
    }

    render() {
        return (
            <div>
                id {this.state.id},
                name {this.state.name}
            </div>
        );
    }
}

export default GroupView;
