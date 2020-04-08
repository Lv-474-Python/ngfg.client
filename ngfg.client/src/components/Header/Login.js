import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button} from '@material-ui/core'
import {API_URL, API_VERSION, REDIRECT_URL, MAIN_PAGE_URL} from '../../constants';

const LOGIN_URL = `${API_URL}/${API_VERSION}/auth/login?redirect_url=${REDIRECT_URL}&main_page_url=${MAIN_PAGE_URL}`;

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