import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import {AppBar, Button, Toolbar} from '@material-ui/core';

import './Header.scss';
import Link from "@material-ui/core/Link";


class Header extends Component {
    state = {
        'page': 'home'
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
        console.log('fields click');
    }

    handleGroupsClick = () => {
        console.log('groups click');
    }

    handleLogoutClick = () => {
        console.log('Log out click');
    }

    render() {
        return (
            <div>

                <AppBar className="navbar"
                        position="static"
                >
                    <Toolbar className="navbar__toolbar">
                        <Button className="navbar__logo"
                                onClick={this.handleLogoClick}
                        >
                            NgFg
                        </Button>

                        {/* <Link className="navbar__link"
                            component="button">
                            Forms
                        </Link> */}

                        <Button className="navbar__link"
                                onClick={this.handleFormsClick}
                        >
                            Forms
                        </Button>
                        <Button className="navbar__link"
                                onClick={this.handleFieldsClick}
                        >
                            Fields
                        </Button>
                        <Button className="navbar__link"
                                onClick={this.handleGroupsClick}
                        >
                            Groups
                        </Button>

                        <Link className='navbar__link'
                              href='http://ngfg.com:8000/api/v1/auth/login?redirect_url=http://localhost:3000/oauth/redirect'>
                            Log in
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withRouter(Header);
