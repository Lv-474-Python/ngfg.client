import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button} from '@material-ui/core'

const API = 'http://ngfg.com:8000/api';
const VERSION = 'v1';
const REDIRECT_URL = 'http://localhost:3000/oauth/redirect';
const MAIN_PAGE_URL = 'http://localhost:3000/';
const LOGIN_URL = `${API}/${VERSION}/auth/login?redirect_url=${REDIRECT_URL}&main_page_url=${MAIN_PAGE_URL}`;

class Login extends Component {
    login = () => {
        window.location.href = LOGIN_URL
    };

    render() {
        return (
            <Button className=' navbar__btn'
                    onClick={this.login}>
                Log in
            </Button>
        );
    }
}

export default withRouter(Login);