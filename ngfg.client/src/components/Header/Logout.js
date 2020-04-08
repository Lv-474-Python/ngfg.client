import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button} from '@material-ui/core'
import axios from 'axios'
import {API_URL, API_VERSION} from '../../constants';

class Logout extends Component {
    logout = () => {
        axios.get(`${API_URL}/${API_VERSION}/auth/logout/`, {
            withCredentials: true
        }).then(response => {
            this.props.handleLogout();
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