import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, CardActions, CardHeader, CardContent, Typography} from "@material-ui/core";
import './GroupView.css'

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
                this.setState({...group}, this.getOwnerName)
            })
    }

    getOwnerName = () => {
        console.log(this.state.ownerId)
        axios.get(`${API_URL}/${API_VERSION}/users/${this.state.ownerId}`, {
            withCredentials: true,
        })
            .then(res => {
                const ownerName = res.data.username;
                this.setState({ownerName})
            });
    };

    componentDidMount() {
        this.getGroupData();
    }

    render() {
        return (
            <div>
                <div className={'Test'}>
                    <Card className='group-view'>
                        {/*<CardHeader*/}
                        {/*        title={this.state.name}*/}
                        {/*/>*/}

                        <CardContent>

                            <Typography variant="h3"
                                        component="h1"
                                        className='group-view-header'>

                                {this.state.name}

                            </Typography>

                            <Typography variant="h6"
                                        component="h2"
                                        className='group-view-owner'>

                                owner name {this.state.ownerName}


                            </Typography>


                            <Typography variant="h6"
                                        component="h2"
                                        className='group-view-created'>

                                created: {this.state.created}

                            </Typography>

                            <Typography variant="h6"
                                        component="h2"
                                        className='group-view-members'>
                                MEMbers:

                                <ol className={"member-list"}>
                                    {this.state.users.map((item, i) =>
                                        <li> {item.username} {item.email} </li>
                                    )}
                                </ol>

                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button
                                className='group-view-link'
                                size="medium"
                                onClick={this.goToView}>
                                View group
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

export default GroupView;
