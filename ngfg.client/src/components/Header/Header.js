import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import {
    AppBar,
    Button,
    Toolbar
} from '@material-ui/core';

import './Header.scss';
import Login from "./Login";
import Logout from "./Logout";

import {SERVER_HOST} from '../../constants';


class Header extends Component {
    state = {
        'page': 'home',
        'login': false
    };

    handleChange = (event, newValue) => {
        this.setState({
            page: newValue
        });
        this.props.history.push(`/${newValue}`);
    };

    handleLogoClick = () => {
        this.props.history.push('/');
    };

    handleFormsClick = () => {
        this.props.history.push('/forms/');
    };

    handleFieldsClick = () => {
        this.props.history.push('/fields/');
    };

    handleGroupsClick = () => {
        this.props.history.push('/groups/');
    };

    componentDidMount() {
        this.verifyLogin()
    }

    verifyLogin = () => {
        axios.get(`${SERVER_HOST}/verify_login`,
            {
                withCredentials: true
            }).then(response => {
                this.setState({login: true})
            }).catch(error => {
                this.setState({login: false})
            });
    };

    handleLogout = () => {
        this.setState({login: false})
    };

    handleLogin = () => {
        return this.state.login ? <Logout handleLogout={this.handleLogout}/> : <Login/>
    };

    render() {

        return (
            <div>
                <AppBar className="navbar"
                        position="static">
                    <Toolbar className="navbar__toolbar">
                        <Button className="navbar__logo"
                                onClick={this.handleLogoClick}>
                            NgFg
                        </Button>

                        <Button className="navbar__link"
                                onClick={this.handleFormsClick}>
                            Forms
                        </Button>
                        <Button className="navbar__link"
                                onClick={this.handleFieldsClick}>
                            Fields
                        </Button>
                        <Button className="navbar__link"
                                onClick={this.handleGroupsClick}>
                            Groups
                        </Button>

                        {this.handleLogin()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);
