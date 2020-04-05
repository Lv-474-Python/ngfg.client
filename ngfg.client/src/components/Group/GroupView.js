import React, {Component} from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";


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

                        <CardContent>

                            <Typography variant="h3"
                                        component="h1"
                                        className='group-view-header'>

                                {this.state.name}

                            </Typography>

                            <Typography variant="h6"
                                        component="h2"
                                        className='group-view-owner'>

                                <div className={'info'}>
                                    <span
                                        className={'owner'}>Owner name: {this.state.ownerName}</span>
                                    <span className={'created'}>Created: {this.state.created}</span>
                                </div>

                            </Typography>

                            <h2>Group Members: </h2>

                            <TableContainer className={'members-container-fake'} component={Paper}>
                                <Table className="members" aria-label="simple table">
                                    <TableHead className={'members-head-fake'}>
                                        <TableRow className={'members-body-fake'}>
                                            <TableCell id={'number'} align={'center'}>#</TableCell>
                                            <TableCell id={'name'} align={'center'}>Name</TableCell>
                                            <TableCell id={'email'}
                                                       align={'center'}>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>

                            {this.state.users.length === 0 ? <h2> Group has no users</h2> :
                                <TableContainer className={'members-container'} component={Paper}>
                                    <Table className="members" aria-label="simple table">
                                        <TableBody className={'members-body'}>
                                            {this.state.users.map((row, index) => (
                                                <TableRow component="tr" key={row.username}>
                                                    <TableCell align={"center"}
                                                               component="td"
                                                               scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell
                                                        align={"center"}>{row.username}</TableCell>
                                                    <TableCell
                                                        align={"center"}>{row.email}</TableCell>


                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            }

                        </CardContent>

                    </Card>
                </div>
            </div>
        );
    }
}

export default GroupView;
