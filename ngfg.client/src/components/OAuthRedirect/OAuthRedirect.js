import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from 'axios'
import {API_URL, API_VERSION} from '../../constants';

class OAuthRedirect extends Component {
    getSession = () => {
        axios.get(`${API_URL}/${API_VERSION}/auth/login/callback` + this.props.location.search, {
            withCredentials: true
        }).then((res) => {
            window.location.href = '/'
        }).catch((error) => {
            console.log(error)
        })

    };

    render() {
        this.getSession();
        return (
            <div></div>
        )
    }
}

export default withRouter(OAuthRedirect);