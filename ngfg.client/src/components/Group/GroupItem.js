import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import './Group.css'

import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import axios from "axios";

class GroupItem extends Component {
    state = {
        ownerName: undefined
    };
    goToView = () => {
        this.props.history.push(`/groups/${this.props.item.id}`)
    };

    getOwnerName = () => {
        axios.get(`http://ngfg.com:8000/api/v1/users/${this.props.item.ownerId}`, {
            withCredentials: true,
        })
            .then(res => {
                const ownerName = res.data.username;
                this.setState({ownerName})
            });
    };

    componentDidMount() {
        this.getOwnerName(this.props.item.ownerId);
    }

    render() {
        return (
            <Card className='group-item'>
                <CardContent>
                    <Typography variant="h5"
                                component="h2"
                                className='group-item-header'>
                        {this.props.item.name}
                    </Typography>
                    <br/>
                    <Typography variant="inherit"
                                component="p"
                                className='group-item-content'>
                        owner: {this.state.ownerName}
                    </Typography>
                    <Typography variant="inherit"
                                component="p"
                                className='group-item-content'>
                        members: {this.props.item.users.length}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button
                        className='group-item-link'
                        size="medium"
                        onClick={this.goToView}>
                        View group
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(GroupItem);
