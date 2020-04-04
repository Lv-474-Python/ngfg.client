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

                            <div className={'info'}>
                                <span className={'owner'}>owner name {this.state.ownerName}</span>
                                <span className={'created'}>created: {this.state.created}</span>
                            </div>

                            </Typography>


                            {/*<Typography variant="h6"*/}
                            {/*            component="h2"*/}
                            {/*            className='group-view-created'>*/}

                            {/*    /!*created: {this.state.created}*!/*/}

                            {/*</Typography>*/}

                            {/*<Typography variant="h6"*/}
                            {/*            component="h2"*/}
                            {/*            className='group-view-members'>*/}
                            {/*    MEMbers:*/}

                            {/*<ol className={"member-list"}>*/}
                            {/*    {this.state.users.map((item, i) =>*/}
                            {/*        <li> {item.username} {item.email} </li>*/}
                            {/*    )}*/}
                            {/*</ol>*/}

                            <TableContainer component={Paper}>
                                <Table className="member" aria-label="simple table">
                                    <TableHead className='member-head'>
                                        <TableRow className={'member-row'}>
                                            <TableCell align={"center"}>#</TableCell>
                                            <TableCell align={"center"}>Name</TableCell>
                                            <TableCell align={"center"}>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className={'member-body'}>
                                        {this.state.users.map((row, index) => (
                                            <TableRow component="tr" key={row.username}>
                                                <TableCell align={"center"}
                                                           component="td"
                                                           scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell
                                                    align={"center"}>{row.username}</TableCell>
                                                <TableCell align={"center"}>{row.email}</TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>


                            {/*</Typography>*/}
                        </CardContent>

                    </Card>
                </div>
            </div>
        );
    }
}

export default GroupView;
