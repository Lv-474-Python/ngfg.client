import React, {Component} from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@material-ui/core";


import './GroupView.css'

const API_URL = 'http://ngfg.com:8000/api';
const API_VERSION = 'v1';
const columns = ["#", "Name", "Email"];

class GroupView extends Component {
    state = {
        "id": undefined,
        "created": undefined,
        "name": undefined,
        "ownerId": undefined,
        "ownerName": undefined,
        "users": [],
        "page": 1,
        "rowsPerPage": 10
    }

    formatDate = (date) => {
        let data = new Date(date);
        let day = data.getDay();
        let month = data.getMonth();
        let year = data.getFullYear();
        return String(day) + "/" + String(month) + "/" + String(year);
    }

    getGroupData = () => {
        axios.get(`${API_URL}/${API_VERSION}/groups/${this.props.match.params.id}`, {
            withCredentials: true,
        })
            .then(res => {
                const group = res.data;
                group.created = this.formatDate(group.created)
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

    handleChangePage = (newPage, pageNumber) => {
        this.setState({page : pageNumber + 1});
    };

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({rowsPerPage : event.target.value, page :1});
    };

    componentDidMount() {
        this.getGroupData();
    }

    render() {
        console.log(this.state.page)
        console.log(this.state.rowsPerPage)
        console.log(this.state.users)
        console.log(this.state.users.slice((this.state.page - 1) * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage))
        console.log((this.state.page - 1) * this.state.rowsPerPage)
        console.log(this.state.page * this.state.rowsPerPage)

        return (
            <Paper className={"root"}>
                <TableContainer className={"container"}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.index}
                                        align={"center"}
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.slice((this.state.page -1)* this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow component="tr" key={row.id}>
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
                                )

                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.users.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page -1}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

export default GroupView;
