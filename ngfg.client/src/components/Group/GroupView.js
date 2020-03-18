import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';

class GroupView extends Component {
    state = {
        "id": undefined,
        "created": undefined,
        "name": undefined,
        "ownerId": undefined,
        "ownerName": undefined,
        "users": []
    }

    getGroupData = () => {
        axios.get(`${API_URL}/${API_VERSION}/groups/${this.props.match.params.id}`, {
            withCredentials: true,
        })
            .then(res => {
                const group = res.data;
                this.setState({ ...group })
            })
    }

    componentDidMount() {
        this.getGroupData();
    }

    render() {
        return (
            <div>
                id {this.state.id},
                name {this.state.name},
                {this.state.users.map(elem =>
                    elem.email
                )}
            </div>
        );
    }
}

export default GroupView;
