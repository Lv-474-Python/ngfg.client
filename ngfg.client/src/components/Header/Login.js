import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button} from '@material-ui/core'

const LOGIN_URL = 'http://ngfg.com:8000/api/v1/auth/login?redirect_url=http://localhost:3000/oauth/redirect';

class Login extends Component {
    login = () => {
        window.location.href = LOGIN_URL
    };

    render() {
        return (
            <Button className=' navbar__link'
                    onClick={this.login}>
                Log in
            </Button>
        );
    }
}

export default withRouter(Login);