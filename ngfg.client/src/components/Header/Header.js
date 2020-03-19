import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import { 
    AppBar, 
    Button, 
    Toolbar 
} from '@material-ui/core';

import './Header.scss';
import Login from "./Login";
import Logout from "./Logout";


class Header extends Component {
    state = {
        'page': 'home',
        'login': false
    };

    handleChange = (event, newValue) => {
        this.setState({
            page: newValue
        });
        console.log(this.props);
        console.log(this.props.history);
        this.props.history.push(`/${newValue}`);
    }

    handleLogoClick = () => {
        console.log('logo click');
        console.log(this.props.history);
        this.props.history.push('/');
    }

    handleFormsClick = () => {
        this.props.history.push('/forms/');
    };

    handleFieldsClick = () => {
        this.props.history.push('/fields/');
    };

    handleGroupsClick = () => {
        this.props.history.push('/groups/');
    }

    componentDidMount() {
        let logged = sessionStorage.getItem('Logged');
        logged = logged === 'true';
        this.setState({'login': logged})
    }

    handleLogin = () => {
        return this.state.login ? <Logout /> : <Login/>
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
