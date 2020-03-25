import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios from 'axios'
import {brown} from "@material-ui/core/colors";

const CALLBACK_URI = 'http://ngfg.com:8000/api/v1/auth/login/callback';

class OAuthRedirect extends Component {
    getSession = () => {
        axios.get(CALLBACK_URI + this.props.location.search, {
            withCredentials: true,
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