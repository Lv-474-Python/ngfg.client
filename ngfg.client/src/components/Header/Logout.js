import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button} from '@material-ui/core'
import axios from 'axios'

const LOGOUT_URL = 'http://ngfg.com:8000/api/v1/auth/logout/';

class Logout extends Component {
    logout = () => {
        axios.get(LOGOUT_URL, {
            withCredentials: true
        }).then(response => {
            sessionStorage.setItem('Logged', 'false');
            window.location.href = '/'
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Button className='navbar__btn'
                    onClick={this.logout}>
                Log out
            </Button>
        );
    }
}

export default withRouter(Logout);